const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Use the environment variable PORT or default to 10000 for local testing
const PORT = process.env.PORT || 10000;

// Serve static files (like your index.html)
app.use(express.static(__dirname));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for chat messages
    socket.on('chat message', (data) => {
        io.emit('chat message', data); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
