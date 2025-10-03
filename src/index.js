require('dotenv').config();
const express = require('express');
const dbConfig = require('./dbConfig/dbConfig');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');
const path = require("path")

const app = express();
app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL], 
  credentials: true
}));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);
// ✅ Socket.IO with proper CORS
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true
  }
});


// 🔌 Use socket handler
const socketHandler = require('./socket/socket');
socketHandler(io);

// Routers
const userRouter = require('./routers/user.router');
app.use('/api/users', userRouter);

const messageRouter = require('./routers/message.router');
app.use('/api/messages', messageRouter);

// Simple route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// DB connection
dbConfig();

const PORT = process.env.PORT;
server.listen(PORT , () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
