import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const url = new URL(request.url);

    // Parse query parameters
    const action = url.searchParams.get("action");
    const severity = url.searchParams.get("severity");
    const limit = url.searchParams.get("limit")
      ? Number.parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Build the filter object for Prisma
    const filter: any = { userId };

    if (action) {
      filter.action = action;
    }

    if (severity) {
      filter.severity = severity;
    }

    // Fetch activities with filters
    const activities = await prisma.userActivity.findMany({
      where: filter,
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    // Calculate statistics
    const stats = {
      total: activities.length,
      byAction: {} as Record<string, number>,
      bySeverity: {
        info: activities.filter((activity) => activity.severity === "info")
          .length,
        warning: activities.filter(
          (activity) => activity.severity === "warning",
        ).length,
        critical: activities.filter(
          (activity) => activity.severity === "critical",
        ).length,
      },
    };

    // Count activities by action
    activities.forEach((activity) => {
      if (!stats.byAction[activity.action]) {
        stats.byAction[activity.action] = 0;
      }
      stats.byAction[activity.action]++;
    });

    return NextResponse.json({
      activities,
      stats,
    });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch user activities" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const activityData = await request.json();

    // Validate required fields
    if (!activityData.action || !activityData.details) {
      return NextResponse.json(
        { error: "Missing required fields: action and details are required" },
        { status: 400 },
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the activity
    const newActivity = await prisma.userActivity.create({
      data: {
        action: activityData.action,
        details: activityData.details,
        severity: activityData.severity || "info",
        timestamp: activityData.timestamp
          ? new Date(activityData.timestamp)
          : new Date(),
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Activity logged successfully",
      activity: newActivity,
    });
  } catch (error) {
    console.error("Error logging activity:", error);
    return NextResponse.json(
      { error: "Failed to log activity" },
      { status: 500 },
    );
  }
}
