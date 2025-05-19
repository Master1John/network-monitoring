import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    const keylog = await prisma.keylog.findUnique({
      where: { id },
      include: {
        device: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    if (!keylog) {
      return NextResponse.json(
        { success: false, message: "Keylog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      keylog: {
        id: keylog.id,
        device: keylog.device?.name || "Unknown Device",
        deviceId: keylog.deviceId,
        timestamp: keylog.timestamp.toISOString(),
        type: keylog.type,
        content: keylog.content,
        flagged: keylog.flagged,
        createdAt: keylog.createdAt.toISOString(),
        updatedAt: keylog.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching keylog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch keylog",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const data = await request.json();

    // Validate the keylog exists
    const existingKeylog = await prisma.keylog.findUnique({
      where: { id },
    });

    if (!existingKeylog) {
      return NextResponse.json(
        { success: false, message: "Keylog not found" },
        { status: 404 },
      );
    }

    // Update the keylog
    const updatedKeylog = await prisma.keylog.update({
      where: { id },
      data: {
        flagged:
          data.flagged !== undefined ? data.flagged : existingKeylog.flagged,
        content: data.content || existingKeylog.content,
        type: data.type || existingKeylog.type,
      },
      include: {
        device: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Keylog updated successfully",
      keylog: {
        id: updatedKeylog.id,
        device: updatedKeylog.device?.name || "Unknown Device",
        deviceId: updatedKeylog.deviceId,
        timestamp: updatedKeylog.timestamp.toISOString(),
        type: updatedKeylog.type,
        content: updatedKeylog.content,
        flagged: updatedKeylog.flagged,
      },
    });
  } catch (error) {
    console.error("Error updating keylog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update keylog",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    // Check if the keylog exists
    const keylog = await prisma.keylog.findUnique({
      where: { id },
    });

    if (!keylog) {
      return NextResponse.json(
        { success: false, message: "Keylog not found" },
        { status: 404 },
      );
    }

    // Delete the keylog
    await prisma.keylog.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Keylog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting keylog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete keylog",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
