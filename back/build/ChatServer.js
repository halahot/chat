"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketIo = require("socket.io");
const constants_1 = require("./constants");
const http_1 = require("http");
//const nats = require('nats').connect('mynats:4222');
const cors = require('cors');
class ChatServer {
    constructor() {
        this._app = express();
        this.port = process.env.PORT || ChatServer.PORT;
        this.sockets_token = new Map();
        this._app.use(cors());
        this._app.options('*', cors());
        this.server = http_1.createServer(this._app);
        this.initSocket();
        this.listen();
    }
    initSocket() {
        this.io = socketIo(this.server);
    }
    addListener(type, socketId, login, token) {
        this.sockets_token.set(socketId, { login, token });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Server is running');
        });
        this.io.on(constants_1.ChatEvent.CONNECT, (socket) => {
            this.addListener(socket.handshake.query.type, socket.id, socket.handshake.query.login, socket.handshake.query.token);
            socket.on(constants_1.ChatEvent.MESSAGE, (m) => {
                console.log(socket.id);
                let user = this.sockets_token.get(socket.id);
                console.log(user);
                //DB.one(sql_send_message, []);
                this.io.to(m.to).emit(constants_1.ChatEvent.MESSAGE, m);
            });
            console.log('join', this.sockets_token);
            socket.on(constants_1.ChatEvent.DISCONNECT, () => {
                this.sockets_token.delete(socket.id);
                console.log('Leave', this.sockets_token);
            });
        });
    }
    get app() {
        return this._app;
    }
}
exports.ChatServer = ChatServer;
ChatServer.PORT = 5589;
//# sourceMappingURL=ChatServer.js.map