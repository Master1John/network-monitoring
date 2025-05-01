import { LoginForm } from "@/components/login-form";

export default function Home() {
  // In a real application, you would check if the user is already authenticated
  // and redirect them to the dashboard if they are
  // const isAuthenticated = await checkAuthStatus();
  // if (isAuthenticated) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Network Monitor</h1>
          <p className="text-muted-foreground">Admin Dashboard Login</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
