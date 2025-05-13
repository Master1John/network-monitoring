import { NextResponse } from "next/server";

// Sample user login history data
const userLoginHistoryData = {
  "user-001": [
    {
      id: "login-001",
      timestamp: "2023-04-06T10:45:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-005",
      timestamp: "2023-04-05T08:45:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-010",
      timestamp: "2023-04-04T09:30:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-015",
      timestamp: "2023-04-03T10:15:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-020",
      timestamp: "2023-04-02T08:30:00",
      ipAddress: "192.168.1.101",
      location: "New York, USA",
      device: "Windows 11 / Chrome",
      status: "success",
      twoFactor: true,
    },
  ],
  "user-002": [
    {
      id: "login-002",
      timestamp: "2023-04-06T10:30:00",
      ipAddress: "192.168.1.102",
      location: "San Francisco, USA",
      device: "macOS / Safari",
      status: "success",
      twoFactor: true,
    },
    {
      id: "login-006",
      timestamp: "2023-04-06T10:00:00",
      ipAddress: "203.0.113.42",
      location: "Los Angeles, USA",
      device: "macOS / Safari",
      status: "success",
      twoFactor: true,
    },
  ],
  "user-003": [
    {
      id: "login-003",
      timestamp: "2023-04-06T09:15:00",
      ipAddress: "192.168.1.103",
      location: "Chicago, USA",
      device: "Windows 10 / Firefox",
      status: "success",
      twoFactor: true,
    },
  ],
  "user-008": [
    {
      id: "login-004",
      timestamp: "2023-04-06T10:30:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "failed",
      twoFactor: false,
      reason: "Invalid password",
    },
    {
      id: "login-007",
      timestamp: "2023-04-06T10:25:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "failed",
      twoFactor: false,
      reason: "Invalid password",
    },
    {
      id: "login-008",
      timestamp: "2023-04-06T10:20:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "failed",
      twoFactor: false,
      reason: "Invalid password",
    },
    {
      id: "login-009",
      timestamp: "2023-04-04T14:20:00",
      ipAddress: "192.168.1.108",
      location: "Boston, USA",
      device: "macOS / Chrome",
      status: "success",
      twoFactor: false,
    },
  ],
  "user-012": [
    {
      id: "login-011",
      timestamp: "2023-04-06T10:05:00",
      ipAddress: "192.168.1.112",
      location: "Seattle, USA",
      device: "Windows 11 / Edge",
      status: "success",
      twoFactor: true,
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
    const status = url.searchParams.get("status");
    const twoFactor = url.searchParams.get("twoFactor");
    const limit = url.searchParams.get("limit")
      ? Number.parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Get login history for the user
    const loginHistory =
      userLoginHistoryData[userId as keyof typeof userLoginHistoryData] || [];

    // Apply filters
    let filteredHistory = [...loginHistory];

    if (status) {
      filteredHistory = filteredHistory.filter(
        (login) => login.status === status,
      );
    }

    if (twoFactor) {
      const isTwoFactor = twoFactor === "true";
      filteredHistory = filteredHistory.filter(
        (login) => login.twoFactor === isTwoFactor,
      );
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      filteredHistory = filteredHistory.slice(0, limit);
    }

    // Calculate statistics
    const stats = {
      total: filteredHistory.length,
      success: filteredHistory.filter((login) => login.status === "success")
        .length,
      failed: filteredHistory.filter((login) => login.status === "failed")
        .length,
      twoFactorEnabled: filteredHistory.filter((login) => login.twoFactor)
        .length,
    };

    return NextResponse.json({
      loginHistory: filteredHistory,
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

    // In a real application, you would save to a database
    // For this mock API, we'll just return success with the data
    const newLogin = {
      id: `login-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      twoFactor: loginData.twoFactor || false,
      ...loginData,
    };

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
