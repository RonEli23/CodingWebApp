import express from 'express';
const app = express();
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io"

const httpServer = createServer(app)
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE_ENV;

app.use(cors())

const io = new Server(httpServer, {
    cors: {
        origin: MODE === "production" ? false : ["http://localhost:3000", "http://127.0.0.1:3000"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})

httpServer.listen(PORT, () => console.log('server is running'))