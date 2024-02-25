import express from 'express';
const app = express();
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io"
import router from './routes/route.js';
import mongoose from 'mongoose';
import { } from 'dotenv/config';
import cookieParser from 'cookie-parser';


const httpServer = createServer(app)
const PORT = process.env.PORT || 8080;
const NODE = process.env.NODE_ENV;
const URI_MONGO = process.env.MONGODB_URI;
const CLIENT_ORIGIN_DEV = process.env.CLIENT_ORIGIN_DEV;
const CLIENT_ORIGIN_PROD = process.env.CLIENT_ORIGIN_PROD;

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? CLIENT_ORIGIN_PROD : CLIENT_ORIGIN_DEV,
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? CLIENT_ORIGIN_PROD
        : [CLIENT_ORIGIN_DEV, 'http://127.0.0.1:3000']
    }
});

// Socket.IO server
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('code_change', data => {
        socket.broadcast.emit("received_data", data)
    })

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
})

//express server
app.use('/api', router);

const connection = async () => {
    await mongoose.connect(URI_MONGO);
    httpServer.listen(PORT, () => console.log('server is running'))
}
connection().catch(err => console.log(err.message));
