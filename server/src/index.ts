import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http, { IncomingMessage } from "http";
import morgan from "morgan";
import { createClient } from "redis";
import { WebSocket, WebSocketServer } from "ws";
import { verifyToken } from "./utils";

const redisClient = createClient({
  url: process.env.REDIS_URL || "",
});

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Work fine");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

interface Client {
  ws: any;
  id: number;
}

let clientsMap = new Map<number, Client>();

function addClient(client: Client) {
  clientsMap.set(client.id, client);
}

wss.on(
  "connection",
  function connection(ws: WebSocket, request: IncomingMessage) {
    ws.on("error", console.error);

    const token = (request.headers as any).cookie;
    const regex = /next-auth.session-token=([^;]+)/;

    const match = token.match(regex);
    const accessToken = match ? match[1] : null;

    if (!accessToken) {
      ws.close();
    }

    try {
      const decoded = verifyToken(accessToken);
      console.log(decoded);
      addClient({ ws, id: (decoded as any).id });

      ws.on("message", function message(data, isBinary) {
        clientsMap.forEach(async function each(client: any) {
          const parsedData = JSON.parse(data.toString("utf-8"));
          parsedData.fromId = (decoded as any).id;
          if (client.ws.readyState == WebSocket.OPEN) {
            client.ws.send(JSON.stringify(parsedData), { binary: isBinary });
          }
        });
      });
    } catch (err) {
      console.log(err);
    }

    ws.send("connected through websocket");
  }
);

server.on("upgrade", (request: IncomingMessage, socket: any, head: Buffer) => {
  wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
    wss.emit("connection", ws, request);
  });
});

async function startServer() {
  try {
    redisClient.connect();
    console.log("redis connected.");

    server.listen(8080, function () {
      console.log(`Listening on 8080`);
    });
  } catch (err) {
    console.log("Failed to start server");
  }
}

startServer();
