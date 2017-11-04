#!/usr/bin/env node

// Base on tutorial --
// http://frostybay.com/articles/tcp-server-with-nodejs

const net = require('net');
const Server = require('./Server');

const PORT = process.env.PORT || 5000;
const ADDRESS = '127.0.0.1';

var server = new Server(PORT, ADDRESS);

server.start(() => {
    console.log(`Server is listening on ${ADDRESS} : ${PORT}`);
})

