import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import SocketContext from "@/lib/contexts/socketContext";
import SocketWrapper from "@/components/SocketWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Network Monitor - Admin Dashboard",
	description: "Admin dashboard for network monitoring and keylog analysis",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	fetch("/api/socket.io");

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<SocketWrapper>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						{children}
					</ThemeProvider>
				</SocketWrapper>
			</body>
		</html>
	);
}
