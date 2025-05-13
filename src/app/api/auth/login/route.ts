import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // In a real application, you would validate the credentials against a database
    // and implement proper authentication with JWT or sessions
    if (username === "admin" && password === "password") {
      // For demo purposes, we're just returning a success response
      // In a real app, you would generate and return a JWT token or set a session cookie
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 },
    );
  }
}
