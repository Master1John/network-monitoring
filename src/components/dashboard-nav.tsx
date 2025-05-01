"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Keyboard,
  Laptop,
  LayoutDashboard,
  Network,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Network",
    href: "/dashboard/network",
    icon: Network,
  },
  {
    title: "Devices",
    href: "/dashboard/devices",
    icon: Laptop,
  },
  {
    title: "Keylogs",
    href: "/dashboard/keylogs",
    icon: Keyboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  // {
  //   title: "Analytics",
  //   href: "/dashboard/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Security",
  //   href: "/dashboard/security",
  //   icon: Shield,
  // },
  // {
  //   title: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  // },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 py-4 fixed">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            pathname === item.href
              ? "bg-muted text-primary"
              : "text-muted-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
