const express=require("express");
const socket=require("socket.io");
const path=require("path")



const app=express();
app.use(express.static(path.join(__dirname,"./public")))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "public/index.html")
})
const server=app.listen(3000,()=>{
    console.log("Server started at 3000")
})

const io=soctet(server,{ors:{origin:"*"}});
let name;
io.on("connection",(socket)=>{
    console.log("Client/user is connected to the server",socket.id);

    socket.on("joining msg",(username)=>{
        name=username
        io.emit("chat message",`=====${username} has joined the chat=====`)
    })

    socket.on("chat message",(msg)=>{
        socket.broadcast.emit("chat message",msg);
    })
    socket.on("disconnect",()=>{
        console.log("Usr has disconnect");
        io.emit("Chat message",`----${name} has left the chat--------`)
    })
})



