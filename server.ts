// server.js
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./src/types/socket";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  let activeSessions = 0;

  io.on("connection", (socket) => {
    activeSessions++;
    console.log(`New user connected. Total: ${activeSessions}`);

    io.emit("session-update", activeSessions);

    socket.on("ask-session-count", () => {
      socket.emit("session-update", activeSessions);
    });

    socket.on("disconnect", () => {
      activeSessions--;
      console.log(`User disconnected. Total: ${activeSessions}`);
      io.emit("session-update", activeSessions);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
