import * as express from 'express';
import * as socketIo from 'socket.io';
import { ChatEvent } from './constants';
import {
  ChatMessage,
} from './types';
import { createServer, Server } from 'http';
const nats = require('nats').connect('mynats:4222');
const HEMERA = require('nats-hemera');
const cors = require('cors');

const hemera = new HEMERA(nats, {
  logLevel: 'fatal',
})

export class ChatServer {
  public static readonly PORT: number = 5589;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private sockets_token: any;
  private login_sockets: any;

  constructor () {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this.sockets_token = new Map();
    this.login_sockets = new Map();
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
    this.login_sockets.set(login, socketId);
  }

  private listen (): void {
    this.server.listen(this.port, () => {
      console.log('Server is running');
    });

    this.io.on(ChatEvent.CONNECT, async (socket: any) => {


      // await hemera.ready();


      this.addListener(socket.handshake.query.type, socket.id, socket.handshake.query.login, socket.handshake.query.token);


      socket.on(ChatEvent.GET_MESSAGES, async() =>{
        
        let messages = await hemera.act({
          topic: 'selector',
          cmd: 'get_messages',
          token: this.sockets_token.get(socket.id).token,
          timedout$: 3000,
        });

        
        this.io.to(socket.id).emit('messages', messages.data);
      })
      

      socket.on(ChatEvent.GET_USERS, async() =>{
        let users = await hemera.act({
          topic: 'selector',
          cmd: 'get_users',
          token: this.sockets_token.get(socket.id).token,
          timedout$: 3000,
        });
        

        this.io.to(socket.id).emit('users', users.data);
      })



      socket.on(ChatEvent.MESSAGE, async (m: ChatMessage) => {
        let user = this.sockets_token.get(socket.id);

        await hemera.act({
          topic: 'taskworker',
          cmd: 'save_message',
          token: user.token,
          login: m.to,
          message: m.message,
          timedout$: 3000,
        });

        if(socket.has(m.to)){
          this.io.to(this.login_sockets.get(m.to)).emit(ChatEvent.MESSAGE, {...m, from: user.login});
        }
      });


      socket.on(ChatEvent.CHECK_TOKEN, async () =>{
        let token = this.sockets_token.get(socket.id);
        
        let res = await hemera.act({
          topic: 'selector',
          cmd: 'check_token',
          token,
          timedout$: 3000,
        });

        this.io.to(socket.id).emit('token_check_result', res.data);
      });


      socket.on(ChatEvent.ADD_FRIEND, async (msg: any) =>{
        let user = this.sockets_token.get(socket.id);

        let res = await hemera.act({
          topic: 'taskworker',
          cmd: 'add_friend',
          token: user.token,
          login: msg.login,
          timedout$: 3000,
        });

        this.io.to(socket.id).emit('ok_add_friend', res.data);
      });



      socket.on(ChatEvent.DELETE_FRIEND, async (msg: any) =>{
        let user = this.sockets_token.get(socket.id);

        let res = await hemera.act({
          topic: 'taskworker',
          cmd: 'delete_friend',
          token: user.token,
          login: msg.login,
          timedout$: 3000,
        });

        this.io.to(socket.id).emit('ok_delete_friend', res.data);
      });

      socket.on(ChatEvent.GET_ACCOUNT, async (msg: any) =>{
        let user = this.sockets_token.get(socket.id);

        let res = await hemera.act({
          topic: 'selector',
          cmd: 'get_account',
          token: user.token,
          timedout$: 3000,
        });

        this.io.to(socket.id).emit('account_info', res.data);
      });

      //console.log('join', this.sockets_token);

      socket.on(ChatEvent.DISCONNECT, () => {

        this.login_sockets.delete(this.sockets_token.get(socket.id).login);
        this.sockets_token.delete(socket.id);

        //console.log('Leave', this.sockets_token);

      });
    });
  }

  get app (): express.Application {
    return this._app;
  }
}