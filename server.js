const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Use the environment variable PORT or default to 10000 for local testing
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
