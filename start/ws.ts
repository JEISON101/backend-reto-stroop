import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server';
import { Server } from 'socket.io'

app.ready(() => {
  const io: Server = new Server(
    server.getNodeServer(),
    { cors: { origin: '*' } }
  );
  io?.on('connection', (socket) => {
    console.log('Una nueva conexión en socket', socket.id);
  });
});
   
    
      