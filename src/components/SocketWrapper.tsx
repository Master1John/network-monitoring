"use client";
import useSocketIO from "@/hooks/useSocketIO";
import SocketContext from "@/lib/contexts/socketContext";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
export default function SocketWrapper({ children }: Props): ReactNode {
	return (
		<SocketContext.Provider value={useSocketIO}>
			{children}
		</SocketContext.Provider>
	);
}
