import { NextResponse } from "next/server";

// Sample user permissions data
const userPermissionsData = {
  "user-001": {
    role: "admin",
    permissions: {
      dashboard: {
        view: true,
        edit: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      devices: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      keylogs: {
        view: true,
        export: true,
        delete: true,
      },
      network: {
        view: true,
        configure: true,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: true,
        edit: true,
      },
    },
  },
  "user-002": {
    role: "admin",
    permissions: {
      dashboard: {
        view: true,
        edit: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      devices: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      keylogs: {
        view: true,
        export: true,
        delete: true,
      },
      network: {
        view: true,
        configure: true,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: true,
        edit: true,
      },
    },
  },
  "user-003": {
    role: "admin",
    permissions: {
      dashboard: {
        view: true,
        edit: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      devices: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      keylogs: {
        view: true,
        export: true,
        delete: true,
      },
      network: {
        view: true,
        configure: true,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: true,
        edit: true,
      },
    },
  },
  "user-008": {
    role: "user",
    permissions: {
      dashboard: {
        view: true,
        edit: false,
      },
      users: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
      devices: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
      keylogs: {
        view: false,
        export: false,
        delete: false,
      },
      network: {
        view: false,
        configure: false,
      },
      security: {
        view: false,
        configure: false,
      },
      settings: {
        view: false,
        edit: false,
      },
    },
  },
  "user-012": {
    role: "security",
    permissions: {
      dashboard: {
        view: true,
        edit: false,
      },
      users: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
      devices: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
      keylogs: {
        view: true,
        export: true,
        delete: false,
      },
      network: {
        view: true,
        configure: false,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: false,
        edit: false,
      },
    },
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const userPermissions =
      userPermissionsData[userId as keyof typeof userPermissionsData];

    if (!userPermissions) {
      return NextResponse.json(
        { error: "User permissions not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ permissions: userPermissions });
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch user permissions" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const updateData = await request.json();

    if (!userPermissionsData[userId as keyof typeof userPermissionsData]) {
      return NextResponse.json(
        { error: "User permissions not found" },
        { status: 404 },
      );
    }

    // In a real application, you would update the database
    // For this mock API, we'll just return success with the updated data
    const updatedPermissions = {
      ...userPermissionsData[userId as keyof typeof userPermissionsData],
      ...updateData,
    };

    return NextResponse.json({
      success: true,
      message: "User permissions updated successfully",
      permissions: updatedPermissions,
    });
  } catch (error) {
    console.error("Error updating user permissions:", error);
    return NextResponse.json(
      { error: "Failed to update user permissions" },
      { status: 500 },
    );
  }
}
