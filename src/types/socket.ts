// types/socket.ts
export interface ServerToClientEvents {
  "session-update": (count: number) => void;
}

export interface ClientToServerEvents {
  "hello": () => void;
  "ask-session-count": () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
}