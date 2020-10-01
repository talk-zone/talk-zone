const express = require('express');
const app = express();
var http = require('http');
const io = require("socket.io")(800);
var users = {};
const fs = require('fs');
const hostname = "127.0.0.1"
const port = 3000;
let indexHTML = fs.readFileSync("\\index.html", 'utf-8');


const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html');
    res.end(indexHTML);
});

io.on("connection", (socket) => {
    socket.on("someone_joined", name => {
        users[socket.id] = name;
        socket.broadcast.emit("joined", name);
    });

    socket.on('sent', message => {
        socket.broadcast.emit('recieved', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(port, hostname, () => {
    console.log(`listening on http://${hostname}:${port}`);
});