const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Connected...');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(3000, () => {
    console.log(`Server is running`);
});
