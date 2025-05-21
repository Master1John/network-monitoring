import { SocketIO } from "@/types/socket";
import io from "socket.io-client";

export default function useSocketIO() {
	return new SocketIO(io({ path: "/api/socket.io" }));
}
