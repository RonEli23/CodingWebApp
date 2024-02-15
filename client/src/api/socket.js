import io from "socket.io-client";

const socket = io.connect("https://codingwebapp-api.onrender.com"); //https://codingwebapp-api.onrender.com http://localhost:8080

export default socket;