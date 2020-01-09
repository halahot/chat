"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketIo = require("socket.io");
const constants_1 = require("./constants");
const http_1 = require("http");
const cors = require('cors');
class ChatServer {
    constructor() {
        this._app = express();
        this.port = process.env.PORT || ChatServer.PORT;
        this.users_helpers = new Map();
        this.empty_users = [];
        this.helpers_count = new Map();
        this._app.use(cors());
        this._app.options('*', cors());
        this.server = http_1.createServer(this._app);
        this.initSocket();
        this.listen();
    }
    initSocket() {
        this.io = socketIo(this.server);
    }
    addListener(type, socketId) {
        if (type == "helper") {
            this.helpers_count.set(socketId, 0);
            let counter = 0;
            for (let i = 0; i < this.empty_users.length; i++) {
                let user = this.empty_users[i];
                this.users_helpers.set(user, socketId);
                this.io.to(user).emit(constants_1.ChatEvent.HELPER_CONNECT);
                counter++;
            }
            this.helpers_count.set(socketId, counter);
            this.empty_users = [];
        }
        if (type == "user") {
            let helper;
            for (let key of this.helpers_count.keys()) {
                helper = key;
                break;
            }
            if (!helper) {
                this.empty_users.push(socketId);
                return;
            }
            let minValue = this.helpers_count.values()[0];
            for (let pair of this.helpers_count.entries()) {
                let mmin = pair[1];
                if (mmin < minValue) {
                    minValue = mmin;
                    helper = pair[0];
                }
            }
            this.helpers_count.set(helper, this.helpers_count.get(helper) + 1);
            this.users_helpers.set(socketId, helper);
        }
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on(constants_1.ChatEvent.CONNECT, (socket) => {
            this.addListener(socket.handshake.query.type, socket.id);
            socket.on(constants_1.ChatEvent.MESSAGE, (m) => {
                this.io.to(m.to).emit(constants_1.ChatEvent.MESSAGE, m);
            });
            socket.on(constants_1.ChatEvent.MESSAGE_TO_HELP, (m) => {
                if (!!this.empty_users.includes(socket.id)) {
                    this.io.to(socket.id).emit(constants_1.ChatEvent.HELPER_DISCONNECT);
                    return;
                }
                let helper = this.users_helpers.get(socket.id);
                this.io.to(helper).emit(constants_1.ChatEvent.MESSAGE, Object.assign(Object.assign({}, m), { socket: socket.id }));
            });
            socket.on(constants_1.ChatEvent.DISCONNECT, () => {
                if (this.helpers_count.has(socket.id)) {
                    let users = [];
                    this.helpers_count.delete(socket.id);
                    for (let pair of this.users_helpers.entries()) {
                        let user = pair[0];
                        let helper = pair[1];
                        if (helper == socket.id) {
                            users.push(user);
                        }
                    }
                    users.map(user => {
                        this.users_helpers.delete(user);
                        this.io.to(user).emit(constants_1.ChatEvent.HELPER_DISCONNECT);
                        this.addListener("user", user);
                    });
                }
                else {
                    let user = socket.id;
                    let helper = this.users_helpers.get(user);
                    this.users_helpers.delete(user);
                    this.io.to(helper).emit(constants_1.ChatEvent.USER_DISCONNECTED, user);
                    this.helpers_count.set(helper, this.helpers_count.get(helper) - 1);
                }
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