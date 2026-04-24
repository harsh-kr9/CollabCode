// import { handleChat, createNewSession } from './chatbot/chatbot';
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { handleChat, createNewSession } = require('./chatbot/chatbot');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://collab-code-gilt.vercel.app', // Your new Vercel URL
        'https://code-unity.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());  // Allow OPTIONS on all routes

app.use(express.json());

// Database
const connectDB = require('./db/connect');
const WorkspaceModel = require('./model/Workspace');

// Routers
const authRouter = require('./routes/authRoute');
const workspaceRouter = require('./routes/workspaceRoute');

// Error handling middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/project', workspaceRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173', 
            'https://collab-code-gilt.vercel.app', // Your new Vercel URL
            'https://code-unity.vercel.app'
        ],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('userDisconnect', async ({ userId, username, meetingId }) => {
        try {
            // Update the user's status to offline in the database based on meetingId
            const updatedWorkspace = await WorkspaceModel.findOneAndUpdate(
                { _id: meetingId, 'team.id': userId }, 
                { $set: { 'team.$.status': 'offline' } },
                { new: true }  
            );
            socket.to(meetingId).emit('user-left', { userId, username, meetingId, updatedWorkspace });

        } catch (error) {
            console.error('Error updating user status:', error);
        }
    });
    
    socket.on('joinRoom', ({roomId,username}) => {
        socket.join(roomId);
        // console.log(`User ${socket.id} joined room: ${roomId}`);
        socket.to(roomId).emit('userJoined', { username, roomId });
    });

    socket.on('code-change', ({ value, meetingId }) => {
        socket.to(meetingId).emit('code-sync', value);
    });

    socket.on('language-change', ({ lang, meetingId }) => {
        socket.to(meetingId).emit('tab-change', lang);
    });

    socket.on('message', ({ text, meetingId, sender, senderPhoto }) => {
        socket.to(meetingId).emit('received-message', { text, sender, senderPhoto });
    });

    socket.on('remove-user', ({ memberId, meetingId }) => {
        socket.to(meetingId).emit('user-removed', { memberId, meetingId });
    });

    socket.on('call', (meetingId) => {
        socket.to(meetingId).emit('incoming-call');
    });

    let sessionId = createNewSession();

    socket.on('userMessage', async (userInput) => {
        try {
            const response = await handleChat(userInput.text, sessionId);
            socket.emit('botResponse', response);
        } catch (error) {
            console.error('Error handling user message:', error);
            socket.emit('botResponse', "I'm sorry, I'm having trouble connecting to my AI brain right now. Please check your Google API key or try again later.");
        }
    });
});

const start = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await connectDB(process.env.MONGO_URL);
        console.log('Connected to MongoDB successfully!');
        server.listen(port, () => console.log(`Server is listening on ${port}`));
    } catch (error) {
        console.error('CRITICAL ERROR: Failed to start server!');
        console.error(error);
        process.exit(1); // Force the process to fail so Render shows the error
    }
};

start();
