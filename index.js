const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server);
io.origins("https://chat-client-amber.vercel.app:*");


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on("send-message", (message) => {
      console.log("Received message on the server:", message); // Log received message
      io.emit("recieved-message", message);
    });
  
    socket.on("disconnect", () => console.log(`User disconnected`));
  });
  
app.get("/",(req,res)=>{
  res.send("Running")
})

server.listen(5000,()=>console.log('Server running at port 5000'))