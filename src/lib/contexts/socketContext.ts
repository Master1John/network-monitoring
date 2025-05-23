import useSocketIO from "@/hooks/useSocketIO";
import { SocketIO } from "@/types/socket";
import { createContext } from "react";

const SocketContext = createContext<undefined | (() => SocketIO)>(undefined);

export default SocketContext;
