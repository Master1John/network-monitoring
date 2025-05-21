import { Server as IOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";

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

		io.on("connection", (socket) => {
			console.log("New client connected:", socket.id);

			socket.on("join", (room: string) => {
				console.log("Attempting to join room: ", room);
				socket.join(room);
			});

			socket.on("NewPackets", (packets: Array<any>) => {
				console.log("Receive new packets");
				io.to("Admin").emit("NewPackets", packets);
			});

			socket.on("disconnect", () => {
				console.log("Client disconnected:", socket.id);
			});
		});

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
