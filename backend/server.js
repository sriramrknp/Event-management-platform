const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { Server } = require('socket.io');
const http = require('http');

require('dotenv').config();

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration
const io = new Server(server, {
  cors: {
    origin: [
      'https://event-management-platform-sriram-reddys-projects.vercel.app', // Frontend URL
      'http://localhost:3000', // Local development
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Enable CORS for all routes
app.use(
  cors({
    origin: [
      'https://event-management-platform-sriram-reddys-projects.vercel.app'
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle event updates
  socket.on('eventUpdate', (updatedEvent) => {
    io.emit('attendeeUpdate', updatedEvent);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));