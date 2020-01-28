import * as express from 'express';
import * as socketIo from 'socket.io';
import { ChatEvent } from './constants';
import {
  ChatMessage,
  User,
  MessageToHelp
} from './types';
import { createServer, Server } from 'http';
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

  constructor () {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this.users_helpers = new Map();
    this.empty_users = [];
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

  private addListener(type: string, socketId: string): void{
    if(type == "helper"){
      this.helpers_count.set(socketId, 0);
      let counter = 0;
      for(let i = 0; i < this.empty_users.length; i++){
        let user = this.empty_users[i];

        this.users_helpers.set(user,socketId);

        this.io.to(user).emit(ChatEvent.HELPER_CONNECT);

        counter++;
      }
      this.helpers_count.set(socketId, counter);

      this.empty_users = [];
    }
    if(type == "user"){

      let helper;
      for (let key of this.helpers_count.keys()) {
        helper = key;
        break;
      }
      if(!helper){
        this.empty_users.push(socketId);
        return;
      }
      let minValue: number = this.helpers_count.values()[0];
      for (let pair of this.helpers_count.entries()) {
        let mmin = pair[1];
        if(mmin < minValue){
          minValue = mmin;
          helper = pair[0];
        }
      }


      this.helpers_count.set(helper, this.helpers_count.get(helper) + 1);
      this.users_helpers.set(socketId, helper);
    }
  }

  private listen (): void {
    this.server.listen(this.port, () => {
      console.log('Server is running');
    });

    this.io.on(ChatEvent.CONNECT, (socket: any) => {


      
      this.addListener(socket.handshake.query.type, socket.id);






      socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
        this.io.to(m.to).emit(ChatEvent.MESSAGE, m);
      });







      socket.on(ChatEvent.MESSAGE_TO_HELP, (m: MessageToHelp) =>{
        if(!!this.empty_users.includes(socket.id)){
          this.io.to(socket.id).emit(ChatEvent.HELPER_DISCONNECT);
          return;
        }
        let helper = this.users_helpers.get(socket.id);
        this.io.to(helper).emit(ChatEvent.MESSAGE, {...m, socket: socket.id});
      });





      socket.on(ChatEvent.DISCONNECT, () => {
        if(this.helpers_count.has(socket.id)){

          let users: string[] = [];

          this.helpers_count.delete(socket.id);

          for (let pair of this.users_helpers.entries()) {
            let user = pair[0];
            let helper = pair[1];

            if(helper == socket.id){
              users.push(user);
            }
          }

          users.map(user =>{
            this.users_helpers.delete(user);
            this.io.to(user).emit(ChatEvent.HELPER_DISCONNECT);
            this.addListener("user", user);
          });
        }
        else{
          let user = socket.id;
          let helper = this.users_helpers.get(user);
          this.users_helpers.delete(user);
          this.io.to(helper).emit(ChatEvent.USER_DISCONNECTED, user);
          this.helpers_count.set(helper, this.helpers_count.get(helper) - 1);
        }
      });
    });
  }

  get app (): express.Application {
    return this._app;
  }
}