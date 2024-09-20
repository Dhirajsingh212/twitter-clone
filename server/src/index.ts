import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http, { IncomingMessage } from "http";
import morgan from "morgan";
import { createClient } from "redis";
import { WebSocket, WebSocketServer } from "ws";
import { verifyJWT } from "./utils";
import { SaveToDB } from "./db/query";

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
  async function connection(ws: WebSocket, request: IncomingMessage) {
    ws.on("error", console.error);

    const url = request.url || " ";
    const accessToken = url.split("token=")[1];

    if (!accessToken) {
      ws.close();
    }

    try {
      const decoded = await verifyJWT(accessToken, process.env.SECRET);
      addClient({ ws, id: (decoded as any).id });

      ws.on("message", async function message(data, isBinary) {
        const newPost = await SaveToDB(
          Number((decoded as any).id),
          data.toString()
        );
        clientsMap.forEach(function each(client: any) {
          if (client.ws.readyState == WebSocket.OPEN) {
            if (newPost) {
              client.ws.send(JSON.stringify(newPost), { binary: isBinary });
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
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
