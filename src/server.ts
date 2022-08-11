import config from 'config';
import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';

import { logger } from './utils';

const port = config.get('port') as number;
export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  private io: SocketIOServer;
  private activeUsers: string[] = [];
  private readonly DEFAULT_PORT = 3000;

  constructor() {
    this.initialize();
    this.configureApp();
    this.configureRoutes();
    this.handleSocketConnection();
  }

  listen(): void {
    this.httpServer.listen(port ||  this.DEFAULT_PORT);
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketIOServer(this.httpServer);
  }

  private configureApp(): void {
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private configureRoutes(): void {
    this.app.get('/', (req, res) => {
      res.sendFile('index.html');
    });
  }

  private handleSocketConnection(): void {
    this.io.on('connection', socket => {
      const existingUser = this.activeUsers.find(user => user === socket.id);

      if (!existingUser) {
        this.activeUsers.push(socket.id);
        socket.emit('update-user-list', {
          users: this.activeUsers.filter(user => user !== socket.id)
        });

        socket.broadcast.emit('update-user-list', {
          users: [socket.id]
        });
      }

      socket.on('call-user', (data: Record<string, string>) => {
        // intercept the call from sender and forward it to receiver.
        socket.to(data.to).emit('call-made', {
          offer: data.offer,
          socket: socket.id
        });
      });

      socket.on('make-answer', (data: Record<string, string>) => {
        socket.to(data.to).emit('answer-made', {
          answer: data.answer,
          socket: socket.id
        });
      });

      socket.on('reject-call', (data: Record<string, string>) => {
        socket.to(data.from).emit('call-rejected', {
          socket: socket.id
        });
      });

      socket.on('disconnect', () => {
        this.activeUsers = this.activeUsers.filter(user => user !== socket.id);

        socket.broadcast.emit('remove-user', {
          socketId: socket.id
        });
      });
    });

  }
}