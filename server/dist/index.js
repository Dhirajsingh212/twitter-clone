"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const redis_1 = require("redis");
const ws_1 = require("ws");
const utils_1 = require("./utils");
const query_1 = require("./db/query");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "",
});
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ noServer: true });
let clientsMap = new Map();
function addClient(client) {
    clientsMap.set(client.id, client);
}
wss.on("connection", function connection(ws, request) {
    return __awaiter(this, void 0, void 0, function* () {
        ws.on("error", console.error);
        const url = request.url || " ";
        const accessToken = url.split("token=")[1];
        if (!accessToken) {
            ws.close();
        }
        try {
            const decoded = yield (0, utils_1.verifyJWT)(accessToken, process.env.SECRET);
            addClient({ ws, id: decoded.id });
            ws.on("message", function message(data, isBinary) {
                clientsMap.forEach(function each(client) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log(data.toString());
                        if (client.ws.readyState == ws_1.WebSocket.OPEN) {
                            const newPost = yield (0, query_1.SaveToDB)(Number(decoded.id), data.toString());
                            if (newPost) {
                                client.ws.send(JSON.stringify(newPost), { binary: isBinary });
                            }
                        }
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    });
});
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            redisClient.connect();
            console.log("redis connected.");
            server.listen(8080, function () {
                console.log(`Listening on 8080`);
            });
        }
        catch (err) {
            console.log("Failed to start server");
        }
    });
}
startServer();
