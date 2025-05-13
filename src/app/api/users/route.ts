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
    id: "user-004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 567-8901",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T10:20:00",
    location: "Dallas, USA",
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "2022-03-01",
    twoFactorEnabled: false,
  },
  {
    id: "user-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 678-9012",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T08:45:00",
    location: "Miami, USA",
    department: "Sales",
    position: "Sales Representative",
    joinDate: "2022-02-15",
    twoFactorEnabled: false,
  },
  {
    id: "user-006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 789-0123",
    role: "user",
    status: "inactive",
    lastActive: "2023-04-05T16:30:00",
    location: "Austin, USA",
    department: "HR",
    position: "HR Specialist",
    joinDate: "2022-01-20",
    twoFactorEnabled: false,
  },
  {
    id: "user-007",
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 890-1234",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T09:50:00",
    location: "Denver, USA",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "2022-03-05",
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
    id: "user-009",
    name: "James Taylor",
    email: "james.taylor@example.com",
    phone: "+1 (555) 345-6789",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T10:10:00",
    location: "Seattle, USA",
    department: "Product",
    position: "Product Manager",
    joinDate: "2022-04-10",
    twoFactorEnabled: true,
  },
  {
    id: "user-010",
    name: "Patricia Moore",
    email: "patricia.moore@example.com",
    phone: "+1 (555) 456-7890",
    role: "user",
    status: "active",
    lastActive: "2023-04-06T09:30:00",
    location: "Portland, USA",
    department: "Customer Support",
    position: "Support Specialist",
    joinDate: "2022-05-15",
    twoFactorEnabled: false,
  },
  {
    id: "user-011",
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    phone: "+1 (555) 567-8901",
    role: "user",
    status: "inactive",
    lastActive: "2023-04-05T11:45:00",
    location: "Phoenix, USA",
    department: "Engineering",
    position: "Software Engineer",
    joinDate: "2022-07-01",
    twoFactorEnabled: true,
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

export async function GET(request: Request) {
  try {
    // Parse query parameters for filtering
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const status = url.searchParams.get("status");
    const department = url.searchParams.get("department");
    const search = url.searchParams.get("search")?.toLowerCase();

    let filteredUsers = [...users];

    // Apply filters
    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    if (department) {
      filteredUsers = filteredUsers.filter(
        (user) => user.department === department,
      );
    }

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.role.toLowerCase().includes(search) ||
          user.department.toLowerCase().includes(search),
      );
    }

    // Calculate statistics
    const stats = {
      total: filteredUsers.length,
      active: filteredUsers.filter((user) => user.status === "active").length,
      inactive: filteredUsers.filter((user) => user.status === "inactive")
        .length,
      locked: filteredUsers.filter((user) => user.status === "locked").length,
      byRole: {} as Record<string, number>,
      byDepartment: {} as Record<string, number>,
    };

    // Count users by role
    filteredUsers.forEach((user) => {
      if (!stats.byRole[user.role]) {
        stats.byRole[user.role] = 0;
      }
      stats.byRole[user.role]++;

      if (!stats.byDepartment[user.department]) {
        stats.byDepartment[user.department] = 0;
      }
      stats.byDepartment[user.department]++;
    });

    return NextResponse.json({
      users: filteredUsers,
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
    const emailExists = users.some((user) => user.email === userData.email);
    if (emailExists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    // In a real application, you would save to a database
    // For this mock API, we'll just return success with the data
    const newUser = {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      ...userData,
      status: userData.status || "active",
      lastActive: new Date().toISOString(),
      joinDate: new Date().toISOString(),
      twoFactorEnabled: userData.twoFactorEnabled || false,
    };

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
