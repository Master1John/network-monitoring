import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;

    const device = await prisma.device.findUnique({
      where: { id: deviceId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    return NextResponse.json({ device });
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { error: "Failed to fetch device" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;
    const updateData = await request.json();

    // Check if device exists
    const existingDevice = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!existingDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Format dates if provided
    if (updateData.lastSeen) {
      updateData.lastSeen = new Date(updateData.lastSeen);
    }

    if (updateData.installedDate) {
      updateData.installedDate = new Date(updateData.installedDate);
    }

    // Update the device
    const updatedDevice = await prisma.device.update({
      where: { id: deviceId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Device updated successfully",
      device: updatedDevice,
    });
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { error: "Failed to update device" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deviceId = params.id;

    // Check if device exists
    const existingDevice = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!existingDevice) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Delete the device
    await prisma.device.delete({
      where: { id: deviceId },
    });

    return NextResponse.json({
      success: true,
      message: "Device deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: "Failed to delete device" },
      { status: 500 },
    );
  }
}
