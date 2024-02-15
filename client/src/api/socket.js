import io from "socket.io-client";

const socket = io.connect("https://codingwebapp-api.onrender.com");

export default socket;