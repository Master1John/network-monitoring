import { handleSocket } from "@/lib/socket";
import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";

export type NextApiResponseWithSocket = NextApiResponse & {
	socket: {
		server: HTTPServer & {
			io?: IOServer;
		};
	};
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponseWithSocket,
) {
	if (!res.socket.server.io) {
		console.log("Initializing new Socket.IO server...");

		const io = new IOServer(res.socket.server, {
			path: "/api/socket.io",
			cors: {
				origin: "*",
				methods: ["GET", "POST"],
			},
		});

		handleSocket(io);

		res.socket.server.io = io;
	} else {
		console.log("Socket.IO server already initialized");
	}

	res.end();
}

export const config = {
	api: {
		bodyParser: false,
	},
};
