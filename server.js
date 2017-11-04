#!/usr/bin/env node
const net = require('net');
const Client = require('./Client');

class Server {
    constructor(port, address) {
        this.port = port || 5000;
        this.address = address || '127.0.0.1';
        this.clients = [];
        this.process = undefined; // Actual listening process
    }

    start (callback) {
        let serverInstance = this;

        // this.process is the actual server process,
        // The callback is executed when the server gets
        // a 'connection' event, indicating a new connection
        this.process = net.createServer((socket) => {
            let client = new Client(socket);
            console.log(`${client.name} connected`);

            // Broadcasting to all about the new connection
            serverInstance.broadcast(`Broadcast: ${client.name} connected`, client);

            serverInstance.clients.push(client);

            socket.on('data', (data) => {
                data = data.toString().trim();
               console.log(`${client.name} said: ${data}`);
               // socket.write(`We got your message ${data}`);
               serverInstance.sendMessage(client, `We got your message ${data}`);
               serverInstance.broadcast(
                    `Broadcast: ${data} received from ${client.name}`,
                    client
                )
            });

            socket.on('end', () => {
                console.log(`${client.name} disconnected`);
                serverInstance.clients.splice(serverInstance.clients.indexOf(client), 1);

                serverInstance.broadcast(
                    `Broadcast: ${client.name} disconnected`,
                    client
                )

            });

        });
        this.process.listen(this.port, this.address);
        this.process.on('listening', callback); // On listening event, run the callback
    }

    // Broadcast to all clients except the sender itself
    broadcast(message, clientSender){
        this.clients.forEach((client) => {
            if( client !== clientSender) this.sendMessage(client, message);
        })
    }

    sendMessage(client, message) {
        client.socket.write(message + '\n');
    }
}

module.exports = Server;


// const PORT = process.env.PORT || 5000;
// const ADDRESS = '127.0.0.1';

// let server = net.createServer(onClientConnected);
// server.listen(PORT, ADDRESS);

// function onClientConnected(socket) {
//     // console.log(`New client: ${socket.remoteAddress} : ${socket.remotePort}`);
//     // socket.destroy();

//     let clientName = `${socket.remoteAddress} : ${socket.remotePort}`;
//     console.log(`${clientName} connected`);

//     socket.on('data', (data) => {
//        console.log(`${clientName} said: ${data.toString()}`);
//        socket.write(`We got your message ${data.toString()}`);
//     });

//     socket.on('end', () => {
//         console.log(`${clientName} disconnected`);
//     })
// }

// console.log(`Server is listening on ${ADDRESS} : ${PORT}`);
