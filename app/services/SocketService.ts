import {Server} from 'socket.io';

let io : Server;

export const setId = (server:Server):void => {io=server};

export const getId = ():Server => {
    if(!io) throw new Error('Socket server not initialized');
    return io;
};