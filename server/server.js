import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from  './routes/adminRoutes.js'
import http from 'http';
import { Server } from 'socket.io'





const app=express();
const appServer=http.createServer(app);

const io = new Server(appServer,{cors: {origin: "*"}}) 


 
dotenv.config();
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(morgan("dev"))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })) 

app.use('/api',userRoutes)
app.use('/api/admin',adminRoutes)

app.get('*',(req,res)=>{
    res.status(404).send("PAGE NOT FOUND")
})

let users=[];
let OnlineUsers=[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId=== userId) && 
    users.push({userId,socketId});
  
}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId !== socketId)
}

const getUser =  (userId)=>{
  
    return users?.find((user)=>user.userId === userId)
}


const addOnlineUser=(userId)=>{
    OnlineUsers.push(userId)
}

io.on("connection",(socket)=>{
    //when connect
    console.log("User Connected",socket.id)

  socket.on("addUser",(userId)=>{
    addUser(userId,socket.id);
    io.emit("getUsers",users) 
  }) 


  //When Online 

  socket.on("OnlineUser",(userId)=>{
    
  })

  //send and get message

  socket.on("sendMessage",({senderId,receiverId,text})=>{
     const user=getUser(receiverId);
     io.to(user?.socketId).emit("getMessage",{
        senderId,
        text  
     }) 
  })

  //when disocnnect
  socket.on("disconnect",()=>{
    console.log("A user Disconnected .....>>>>>>");
    removeUser(socket.id);
    io.emit("getUsers",users)
  })

})

 
dbConnection().then(()=>{
    appServer.listen(process.env.PORT,()=>console.log(`SERVER STARTED AT PORT:${process.env.PORT}`))
})       