import { NextResponse } from "next/server";

// Sample user activity data
const userActivityData = {
  "user-001": [
    {
      id: "act-001",
      action: "login",
      details: "Logged in from 192.168.1.101",
      timestamp: "2023-04-06T10:45:00",
      severity: "info",
    },
    {
      id: "act-008",
      action: "settings",
      details: "Updated network monitoring rules",
      timestamp: "2023-04-06T10:10:00",
      severity: "info",
    },
    {
      id: "act-011",
      action: "device",
      details: "Added new device: Server-Main",
      timestamp: "2023-04-06T09:55:00",
      severity: "info",
    },
    {
      id: "act-015",
      action: "security",
      details: "Reviewed security alerts",
      timestamp: "2023-04-06T09:30:00",
      severity: "info",
    },
    {
      id: "act-020",
      action: "login",
      details: "Logged in from 192.168.1.101",
      timestamp: "2023-04-05T08:45:00",
      severity: "info",
    },
  ],
  "user-002": [
    {
      id: "act-003",
      action: "user",
      details: "Created new user account for Thomas Anderson",
      timestamp: "2023-04-06T10:35:00",
      severity: "info",
    },
    {
      id: "act-010",
      action: "login",
      details: "Logged in from new location: 203.0.113.42",
      timestamp: "2023-04-06T10:00:00",
      severity: "warning",
    },
  ],
  "user-003": [
    {
      id: "act-002",
      action: "settings",
      details: "Changed security settings",
      timestamp: "2023-04-06T10:40:00",
      severity: "info",
    },
    {
      id: "act-009",
      action: "security",
      details: "Enabled two-factor authentication",
      timestamp: "2023-04-06T10:05:00",
      severity: "info",
    },
  ],
  "user-008": [
    {
      id: "act-004",
      action: "login",
      details: "Failed login attempt (3rd attempt)",
      timestamp: "2023-04-06T10:30:00",
      severity: "warning",
    },
    {
      id: "act-006",
      action: "locked",
      details: "Account locked due to multiple failed login attempts",
      timestamp: "2023-04-06T10:20:00",
      severity: "critical",
    },
  ],
  "user-012": [
    {
      id: "act-005",
      action: "security",
      details: "Reset password for user Michael Brown",
      timestamp: "2023-04-06T10:25:00",
      severity: "info",
    },
  ],
};

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

    // Get activities for the user
    const activities =
      userActivityData[userId as keyof typeof userActivityData] || [];

    // Apply filters
    let filteredActivities = [...activities];

    if (action) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.action === action,
      );
    }

    if (severity) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.severity === severity,
      );
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      filteredActivities = filteredActivities.slice(0, limit);
    }

    // Calculate statistics
    const stats = {
      total: filteredActivities.length,
      byAction: {} as Record<string, number>,
      bySeverity: {
        info: filteredActivities.filter(
          (activity) => activity.severity === "info",
        ).length,
        warning: filteredActivities.filter(
          (activity) => activity.severity === "warning",
        ).length,
        critical: filteredActivities.filter(
          (activity) => activity.severity === "critical",
        ).length,
      },
    };

    // Count activities by action
    filteredActivities.forEach((activity) => {
      if (!stats.byAction[activity.action]) {
        stats.byAction[activity.action] = 0;
      }
      stats.byAction[activity.action]++;
    });

    return NextResponse.json({
      activities: filteredActivities,
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

    // In a real application, you would save to a database
    // For this mock API, we'll just return success with the data
    const newActivity = {
      id: `act-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      severity: activityData.severity || "info",
      ...activityData,
    };

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
