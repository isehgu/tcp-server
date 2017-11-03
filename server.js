#!/usr/bin/env node
const net = require('net');

const PORT = process.env.PORT || 5000;
const ADDRESS = '127.0.0.1';

let server = net.createServer(onClientConnected);
server.listen(PORT, ADDRESS);

function onClientConnected(socket) {
    // console.log(`New client: ${socket.remoteAddress} : ${socket.remotePort}`);
    // socket.destroy();

    let clientName = `${socket.remoteAddress} : ${socket.remotePort}`;
    console.log(`${clientName} connected`);

    socket.on('data', (data) => {
       console.log(`${clientName} said: ${data.toString()}`);
       socket.write(`We got your message ${data.toString()}`);
    });

    socket.on('end', () => {
        console.log(`${clientName} disconnected`);
    })
}

console.log(`Server is listening on ${ADDRESS} : ${PORT}`);
