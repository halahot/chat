import * as express from 'express';
import * as socketIo from 'socket.io';
import { ChatEvent } from './constants';
import {
  ChatMessage,
  User,
  MessageToHelp
} from './types';
import { createServer, Server } from 'http';
//const nats = require('nats').connect('mynats:4222');
const cors = require('cors');

export class ChatServer {
  public static readonly PORT: number = 5589;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  private empty_users: string[];
  private users_helpers: any;
  private helpers_count: any;
  private sockets_token: any;

  constructor () {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this.users_helpers = new Map();
    this.empty_users = [];
    this.sockets_token = new Map();
    this.helpers_count = new Map();
    this._app.use(cors());
    this._app.options('*', cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket (): void {
    this.io = socketIo(this.server);
  }

  private addListener(type: string, socketId: string, login: string, token: string): void{
    this.sockets_token.set(socketId, {login, token});
  }

  private listen (): void {
    this.server.listen(this.port, () => {
      console.log('Server is running');
    });

    this.io.on(ChatEvent.CONNECT, (socket: any) => {




      this.addListener(socket.handshake.query.type, socket.id, socket.handshake.query.login, socket.handshake.query.token);




      socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
        this.io.to(m.to).emit(ChatEvent.MESSAGE, m);
      });


      console.log('join', this.sockets_token);




      socket.on(ChatEvent.DISCONNECT, () => {

        this.sockets_token.delete(socket.id);
        console.log('Leave', this.sockets_token);

      });
    });
  }

  get app (): express.Application {
    return this._app;
  }
}