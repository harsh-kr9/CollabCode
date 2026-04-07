const express = require('express');
require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoute');
const workspaceRouter = require('./routes/workspaceRoute');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CollabCode API is running');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workspace', workspaceRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    await connectDB(process.env.MONGO_URL);
    try {
        app.listen(port, console.log('Server is listening on port ' + port));
    } catch (error) {
        console.log(error);
    }
};

start();
