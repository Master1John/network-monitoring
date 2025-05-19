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
    const status = url.searchParams.get("status");
    const twoFactor = url.searchParams.get("twoFactor");
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

    if (status) {
      filter.status = status;
    }

    if (twoFactor !== null) {
      filter.twoFactor = twoFactor === "true";
    }

    // Fetch login history with filters
    const loginHistory = await prisma.loginHistory.findMany({
      where: filter,
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    // Calculate statistics
    const stats = {
      total: loginHistory.length,
      success: loginHistory.filter((login) => login.status === "success")
        .length,
      failed: loginHistory.filter((login) => login.status === "failed").length,
      twoFactorEnabled: loginHistory.filter((login) => login.twoFactor).length,
    };

    return NextResponse.json({
      loginHistory,
      stats,
    });
  } catch (error) {
    console.error("Error fetching user login history:", error);
    return NextResponse.json(
      { error: "Failed to fetch user login history" },
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
    const loginData = await request.json();

    // Validate required fields
    if (!loginData.ipAddress || !loginData.device || !loginData.status) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: ipAddress, device, and status are required",
        },
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

    // Create the login record
    const newLogin = await prisma.loginHistory.create({
      data: {
        ipAddress: loginData.ipAddress,
        location: loginData.location,
        device: loginData.device,
        status: loginData.status,
        twoFactor: loginData.twoFactor || false,
        reason: loginData.reason,
        timestamp: loginData.timestamp
          ? new Date(loginData.timestamp)
          : new Date(),
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Login record created successfully",
      login: newLogin,
    });
  } catch (error) {
    console.error("Error creating login record:", error);
    return NextResponse.json(
      { error: "Failed to create login record" },
      { status: 500 },
    );
  }
}
