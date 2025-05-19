import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Parse query parameters for filtering
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const status = url.searchParams.get("status");
    const department = url.searchParams.get("department");
    const search = url.searchParams.get("search")?.toLowerCase();

    // Build the filter object for Prisma
    const filter: any = {};

    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.status = status;
    }

    if (department) {
      filter.department = department;
    }

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { role: { contains: search, mode: "insensitive" } },
        { department: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch users with filters
    const users = await prisma.user.findMany({
      where: filter,
      include: {
        devices: {
          select: {
            id: true,
          },
        },
      },
    });

    // Add device count to each user
    const usersWithDeviceCount = users.map((user) => ({
      ...user,
      deviceCount: user.devices.length,
      devices: undefined, // Remove the devices array
    }));

    // Calculate statistics
    const stats = {
      total: users.length,
      active: users.filter((user) => user.status === "active").length,
      inactive: users.filter((user) => user.status === "inactive").length,
      locked: users.filter((user) => user.status === "locked").length,
      byRole: {} as Record<string, number>,
      byDepartment: {} as Record<string, number>,
    };

    // Count users by role and department
    users.forEach((user) => {
      if (user.role) {
        if (!stats.byRole[user.role]) {
          stats.byRole[user.role] = 0;
        }
        stats.byRole[user.role]++;
      }

      if (user.department) {
        if (!stats.byDepartment[user.department]) {
          stats.byDepartment[user.department] = 0;
        }
        stats.byDepartment[user.department]++;
      }
    });

    return NextResponse.json({
      users: usersWithDeviceCount,
      stats,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    // Validate required fields
    if (!userData.name || !userData.email || !userData.role) {
      return NextResponse.json(
        {
          error: "Missing required fields: name, email, and role are required",
        },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: userData.status || "active",
        lastActive: userData.lastActive
          ? new Date(userData.lastActive)
          : new Date(),
        location: userData.location,
        department: userData.department,
        position: userData.position,
        joinDate: userData.joinDate ? new Date(userData.joinDate) : new Date(),
        twoFactorEnabled: userData.twoFactorEnabled || false,
      },
    });

    // Create default permissions for the user
    await prisma.permission.create({
      data: {
        userId: newUser.id,
        role: newUser.role,
        permissions: getDefaultPermissions(newUser.role),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

// Helper function to get default permissions based on role
function getDefaultPermissions(role: string) {
  switch (role) {
    case "admin":
      return {
        dashboard: { view: true, edit: true },
        users: { view: true, create: true, edit: true, delete: true },
        devices: { view: true, create: true, edit: true, delete: true },
        keylogs: { view: true, export: true, delete: true },
        network: { view: true, configure: true },
        security: { view: true, configure: true },
        settings: { view: true, edit: true },
      };
    case "security":
      return {
        dashboard: { view: true, edit: false },
        users: { view: true, create: false, edit: false, delete: false },
        devices: { view: true, create: false, edit: false, delete: false },
        keylogs: { view: true, export: true, delete: false },
        network: { view: true, configure: false },
        security: { view: true, configure: true },
        settings: { view: false, edit: false },
      };
    default: // user
      return {
        dashboard: { view: true, edit: false },
        users: { view: false, create: false, edit: false, delete: false },
        devices: { view: true, create: false, edit: false, delete: false },
        keylogs: { view: false, export: false, delete: false },
        network: { view: false, configure: false },
        security: { view: false, configure: false },
        settings: { view: false, edit: false },
      };
  }
}
