// src/lib/socketClient.ts
"use client";

import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "@/types/socket";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

export const getSocket = () => {
  if (!socket) {
    socket = io({
      path: "/socket.io",
      autoConnect: true,
      reconnectionAttempts: 5,
    });
  }
  return socket;
};