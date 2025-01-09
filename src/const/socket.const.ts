import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001'; // Replace with your backend's URL if deployed
const socket: Socket = 
    io (
        SOCKET_URL, 
        {
            transports: ['websocket'], // Use WebSocket as the transport
            reconnectionAttempts: 5,  // Number of reconnection attempts
            reconnectionDelay: 3000,  // Delay between reconnections
        }
    )

export default socket;