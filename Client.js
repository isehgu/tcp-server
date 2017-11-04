const net = require('net');

class Client {
    constructor(socket) {
        this.name = `${socket.remoteAddress} : ${socket.remotePort}`;
        this.socket = socket;
    }

    // Example uses this method in client.
    // But I preferred it to be in Server.
    // So I moved this to server's sendMessage method
    receiveMessage(message) {
        this.socket.write(message);
    }
}

module.exports = Client;
