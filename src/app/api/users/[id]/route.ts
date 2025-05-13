import { NextResponse } from "next/server";

// In a real application, this would be fetched from a database
const users = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T10:45:00",
    location: "New York, USA",
    department: "IT",
    position: "System Administrator",
    joinDate: "2022-01-15",
    twoFactorEnabled: true,
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T10:30:00",
    location: "San Francisco, USA",
    department: "IT",
    position: "Network Administrator",
    joinDate: "2022-02-10",
    twoFactorEnabled: true,
  },
  {
    id: "user-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    role: "admin",
    status: "active",
    lastActive: "2023-04-06T09:15:00",
    location: "Chicago, USA",
    department: "IT",
    position: "IT Director",
    joinDate: "2021-11-05",
    twoFactorEnabled: true,
  },
  {
    id: "user-008",
    name: "Lisa Wilson",
    email: "lisa.wilson@example.com",
    phone: "+1 (555) 234-5678",
    role: "user",
    status: "locked",
    lastActive: "2023-04-04T14:20:00",
    location: "Boston, USA",
    department: "Marketing",
    position: "Marketing Specialist",
    joinDate: "2022-06-20",
    twoFactorEnabled: false,
  },
  {
    id: "user-012",
    name: "Jennifer White",
    email: "jennifer.white@example.com",
    phone: "+1 (555) 876-5432",
    role: "security",
    status: "active",
    lastActive: "2023-04-06T10:05:00",
    location: "Seattle, USA",
    department: "Security",
    position: "Security Analyst",
    joinDate: "2022-04-15",
    twoFactorEnabled: true,
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
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
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData = await request.json();

    // In a real application, you would update the database
    // For this mock API, we'll just return success with the updated data
    const updatedUser = {
      ...users[userIndex],
      ...updateData,
      id: userId, // Ensure ID doesn't change
    };

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // In a real application, you would delete from the database
    // For this mock API, we'll just return success
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
