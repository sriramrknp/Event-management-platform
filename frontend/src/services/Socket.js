import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'], // Enable both transports
});

export default socket;