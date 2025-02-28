const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Define allowedOrigins BEFORE using it
const allowedOrigins = [
  'https://eventmanageplt-sriram-reddys-projects.vercel.app',
  'https://event-management-platform-ivory.vercel.app',
  'https://eventmanageplt-git-main-sriram-reddys-projects.vercel.app/login'
];

// Enhanced CORS configuration for Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Enable CORS for all routes
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
