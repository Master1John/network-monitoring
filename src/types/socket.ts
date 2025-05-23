import { Socket } from "socket.io-client";
import { Server } from "socket.io";

export class SocketIO {
	id: Socket["id"];

	constructor(protected io: Socket) {
		this.id = io.id;

		io.on("connect", () => {
			console.log("Connected:", io.id);
		});

		io.on("connect_error", (err) => {
			console.error("Connection error:", err.message, err.stack);
		});
	}

	join(room: string) {
		return new PresenceRoom(this.io, room);
	}

	private(room: string) {
		return new PrivateRoom(this.io, room);
	}

	disconnect() {
		this.io.disconnect();
	}

	emit(ev: string, data: any) {
		this.io.emit(ev, data);
	}
}

export class Room {
	room!: string;

	constructor(
		protected socket: Socket,
		room: string,
	) {
		this.room = room;
	}

	listen(event: string, callback: (...data: any[]) => void) {
		if (!["here", "joining", "leaving"].includes(event)) {
			this.socket.on(event, callback);
		}

		return this;
	}
}

export class PresenceRoom extends Room {
	constructor(socket: Socket, room: string) {
		super(socket, room);

		socket.emit("join", room);
	}

	here<T = any>(callback: (members: Array<T>) => void) {
		this.socket.on("here", callback);

		return this;
	}

	joining<T = any>(callback: (member: T) => void) {
		this.socket.on("joining", callback);

		return this;
	}

	leaving(callback: (member: any) => void) {
		this.socket.on("leaving", callback);

		return this;
	}
}

export class PrivateRoom extends Room {
	constructor(socket: Socket, room: string) {
		super(socket, room);

		socket.emit("join:private", room);
	}
}
