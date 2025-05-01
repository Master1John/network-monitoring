import { NextResponse } from "next/server";

// Sample keylog data by device
const deviceKeylogs = {
  "device-003": [
    {
      id: "KL001",
      timestamp: "2023-04-06T10:30:00",
      type: "Application",
      content: "Microsoft Word - Document1.docx",
      flagged: false,
    },
    {
      id: "KL005",
      timestamp: "2023-04-06T10:25:00",
      type: "Browser",
      content: "https://mail.google.com",
      flagged: false,
    },
    {
      id: "KL009",
      timestamp: "2023-04-06T10:20:00",
      type: "System",
      content: "Login",
      flagged: false,
    },
    {
      id: "KL013",
      timestamp: "2023-04-06T10:15:00",
      type: "Application",
      content: "Microsoft Excel - Budget2023.xlsx",
      flagged: false,
    },
    {
      id: "KL017",
      timestamp: "2023-04-06T10:10:00",
      type: "Browser",
      content: "https://internal.company.com/reports",
      flagged: false,
    },
    {
      id: "KL021",
      timestamp: "2023-04-06T10:05:00",
      type: "Application",
      content: "Password Manager",
      flagged: true,
    },
    {
      id: "KL025",
      timestamp: "2023-04-06T10:00:00",
      type: "System",
      content: "Startup",
      flagged: false,
    },
  ],
  "device-004": [
    {
      id: "KL002",
      timestamp: "2023-04-06T09:45:00",
      type: "Browser",
      content: "https://internal.company.com/sensitive",
      flagged: true,
    },
    {
      id: "KL006",
      timestamp: "2023-04-06T09:40:00",
      type: "Application",
      content: "Adobe Photoshop",
      flagged: false,
    },
    {
      id: "KL010",
      timestamp: "2023-04-06T09:35:00",
      type: "System",
      content: "Login",
      flagged: false,
    },
  ],
  "device-006": [
    {
      id: "KL003",
      timestamp: "2023-04-06T10:40:00",
      type: "System",
      content: "Database backup",
      flagged: false,
    },
    {
      id: "KL007",
      timestamp: "2023-04-06T10:35:00",
      type: "Application",
      content: "MySQL Workbench",
      flagged: false,
    },
    {
      id: "KL011",
      timestamp: "2023-04-06T10:30:00",
      type: "System",
      content: "Service restart: nginx",
      flagged: false,
    },
    {
      id: "KL015",
      timestamp: "2023-04-06T10:25:00",
      type: "System",
      content: "Failed login attempt: root",
      flagged: true,
    },
    {
      id: "KL019",
      timestamp: "2023-04-06T10:20:00",
      type: "System",
      content: "Failed login attempt: admin",
      flagged: true,
    },
    {
      id: "KL023",
      timestamp: "2023-04-06T10:15:00",
      type: "System",
      content: "Failed login attempt: administrator",
      flagged: true,
    },
  ],
  "device-007": [
    {
      id: "KL004",
      timestamp: "2023-04-06T10:20:00",
      type: "Application",
      content: "Email - Confidential Report",
      flagged: true,
    },
    {
      id: "KL008",
      timestamp: "2023-04-06T10:15:00",
      type: "Browser",
      content: "https://finance.company.com/reports",
      flagged: false,
    },
    {
      id: "KL012",
      timestamp: "2023-04-06T10:10:00",
      type: "Application",
      content: "Messages - SMS to +1234567890",
      flagged: false,
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const url = new URL(request.url);

    // Parse query parameters
    const type = url.searchParams.get("type");
    const flagged = url.searchParams.get("flagged");
    const limit = url.searchParams.get("limit")
      ? parseInt(url.searchParams.get("limit")!)
      : undefined;

    // Get keylogs for the device
    const keylogs = deviceKeylogs[deviceId as keyof typeof deviceKeylogs] || [];

    // Apply filters
    let filteredKeylogs = [...keylogs];

    if (type) {
      filteredKeylogs = filteredKeylogs.filter(
        (keylog) => keylog.type.toLowerCase() === type.toLowerCase(),
      );
    }

    if (flagged) {
      const isFlagged = flagged === "true";
      filteredKeylogs = filteredKeylogs.filter(
        (keylog) => keylog.flagged === isFlagged,
      );
    }

    // Apply limit if specified
    if (limit && limit > 0) {
      filteredKeylogs = filteredKeylogs.slice(0, limit);
    }

    // Calculate statistics
    const stats = {
      total: filteredKeylogs.length,
      flagged: filteredKeylogs.filter((keylog) => keylog.flagged).length,
      byType: {} as Record<string, number>,
    };

    // Count keylogs by type
    filteredKeylogs.forEach((keylog) => {
      if (!stats.byType[keylog.type]) {
        stats.byType[keylog.type] = 0;
      }
      stats.byType[keylog.type]++;
    });

    return NextResponse.json({
      keylogs: filteredKeylogs,
      stats,
    });
  } catch (error) {
    console.error("Error fetching device keylogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch device keylogs" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const keylogData = await request.json();

    // Validate required fields
    if (!keylogData.type || !keylogData.content) {
      return NextResponse.json(
        { error: "Missing required fields: type and content are required" },
        { status: 400 },
      );
    }

    // In a real application, you would save to a database
    // For this mock API, we'll just return success with the data
    const newKeylog = {
      id: `KL${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      flagged: keylogData.flagged || false,
      ...keylogData,
    };

    return NextResponse.json({
      success: true,
      message: "Keylog entry created successfully",
      keylog: newKeylog,
    });
  } catch (error) {
    console.error("Error creating keylog entry:", error);
    return NextResponse.json(
      { error: "Failed to create keylog entry" },
      { status: 500 },
    );
  }
}
