import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user permissions
    const permissions = await prisma.permission.findUnique({
      where: { userId },
    });

    if (!permissions) {
      return NextResponse.json(
        { error: "User permissions not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ permissions });
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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if permissions exist
    const existingPermissions = await prisma.permission.findUnique({
      where: { userId },
    });

    if (!existingPermissions) {
      // Create permissions if they don't exist
      const newPermissions = await prisma.permission.create({
        data: {
          userId,
          role: updateData.role || user.role,
          permissions:
            updateData.permissions || getDefaultPermissions(user.role),
        },
      });

      return NextResponse.json({
        success: true,
        message: "User permissions created successfully",
        permissions: newPermissions,
      });
    }

    // Update permissions
    const updatedPermissions = await prisma.permission.update({
      where: { userId },
      data: {
        role: updateData.role || existingPermissions.role,
        permissions: updateData.permissions || existingPermissions.permissions,
      },
    });

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
