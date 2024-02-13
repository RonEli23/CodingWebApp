import express from 'express';
const app = express();
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io"

const httpServer = createServer(app)
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE_ENV;

app.use(cors())

// Keep track of users in each code block
let firstConnection = true;

const io = new Server(httpServer, {
    cors: {
        origin: MODE === "production" ? false : ["http://localhost:3000", "http://127.0.0.1:3000"]
    }
})

// Socket.IO server
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    console.log(firstConnection)

    socket.on("code_submit", data => {
        console.log(data);
    })

    socket.on('code_change', data => {
        socket.broadcast.emit("received_data", data)
    })
})

// Express.js HTTP routes
app.get("/api/isMentorStatus", (req, res) => {
    console.log("hi")
    if(firstConnection){
        firstConnection = false;
        res.json(true);
    }
    else{
        res.json(false);
    }
})

app.get("/api/codeBlock/:id", (req, res) => {
    
})

httpServer.listen(PORT, () => console.log('server is running'))