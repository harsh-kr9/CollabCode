import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'; 

const options = {
    reconnection: true,               
    reconnectionAttempts: Infinity, 
    transports: ['polling', 'websocket'], 
    autoConnect: true
};

export const initializeSocket = async () => {
    console.log("Connecting socket to:", SOCKET_URL);
    const socket = io(SOCKET_URL, options);
    
    socket.on('connect', () => {
        console.log("Socket connected successfully! Connection ID:", socket.id);
    });

    socket.on('connect_error', (error) => {
        console.error("Socket connection error details:", error.message);
    });

    socket.on('disconnect', (reason) => {
        console.warn("Socket disconnected. Reason:", reason);
    });

    return socket;
};
