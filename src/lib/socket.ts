import { Device, Packet } from "@/types";
import { Server, Socket } from "socket.io";

const rooms: { [name: string]: Array<any> } = {};
const nodes: { [socketId: string]: { rooms: Array<string> } } = {};

export function handleSocket(io: Server) {
	io.on("connection", (socket) => {
		console.log("New client connected:", socket.id);

		socket.on("join", (args) => {
			const room = typeof args == "string" ? args : args[0];
			const data = typeof args == "string" ? undefined : args[1];

			socket.join(room);

			// Add current socket to room
			rooms[room] = rooms[room] || [];
			rooms[room].push(data ? { ...data, socketId: socket.id } : socket.id);

			// Add current room to nodes list on the socket
			nodes[socket.id] = nodes[socket.id] || {};
			nodes[socket.id].rooms = nodes[socket.id]?.rooms || [];
			nodes[socket.id].rooms.push(room);

			socket.emit("here", rooms[room]);
			io.to(room).emit("joining", { sid: socket.id });

			if (room === "Nodes") {
				io.to("Admin").emit("Node", data ? { ...data } : socket.id);
			}

			if (room === "Admin") {
				io.to("Admin").emit("Nodes", rooms["Nodes"] ?? []);
			}
		});

		socket.on("NewPackets", (packets: Array<Packet>) => {
			io.to("Admin").emit("NewPackets", packets);
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected:", socket.id);

			// Delete disconnected socket from its rooms
			console.log("\n Before diconnection data: room, nodes", rooms, nodes);
			for (const room of nodes[socket.id]?.rooms || []) {
				const index = rooms[room]?.findIndex((node) =>
					typeof node === "string"
						? node == socket.id
						: node.socketId == socket.id,
				);

				if (index >= 0) {
					rooms[room]?.splice(index, 1);

					if (rooms[room].length < 0) delete rooms[room];
				}

				if (room == "Nodes") {
					io.to("Admin").emit("Nodes", rooms["Nodes"]);
				}
			}

			if (nodes.hasOwnProperty(socket.id)) {
				delete nodes[socket.id];
			}
			console.log("\nAfter diconnection data: room, nodes", rooms, nodes);
		});
	});
}
