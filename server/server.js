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
import { errorHandler } from './middlewares/errorHandler.js'





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

app.all('*',(req,res,next)=>{
  const err=new Error(`Requested URL ${req.url} not Found!`)
  err.statusCode=404;
  next(err)
   
})
 

app.use(errorHandler)

let users=[];
let OnlineUsers=[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId=== userId) && 
    users.push({userId,socketId});
  
}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId !== socketId)
}

const getUser = (usersId)=>{   
    return users?.find((user)=>user.userId === usersId)
}

const addNewUser = (userName,socketId) =>{
  !OnlineUsers.some(user=>user.userName === userName) && OnlineUsers.push({userName,socketId});
}

const removeNotificationUser = (socketId)=>{
  OnlineUsers=OnlineUsers.filter(user=>user.socketId !== socketId)
}

const getNotificationUser = (userName) =>{
  return OnlineUsers?.find(user=>user?.userName === userName);
}
// const addOnlineUser=(userId)=>{
//     OnlineUsers.push(userId)
// }

io.on("connection",(socket)=>{
    //when connect
    console.log("User Connected",socket.id)

  socket.on("addUser",(userId)=>{
    addUser(userId,socket.id);
    io.emit("getUsers",users) 
  }) 



 //Notfication Feature

 socket.on('newUser',(userName)=>{
  console.log(userName,socket.id,"addneruser")
  addNewUser(userName,socket.id);
 })

 socket.on("sendNotification",({senderName,receiverName,type})=>{
  console.log(senderName,receiverName,type,"sedn") 
  const receiver=getNotificationUser(receiverName);
  console.log(receiver,"receiever name")
    io.to(receiver?.socketId).emit('getNotification',{
      senderName,
      type
    }) 
 })


  //send and get message

  socket.on("sendMessage",({senderId,receiverId,text})=>{
    console.log(senderId,receiverId,text,"alldata")
     const user=getUser(receiverId);
    users.map(user=>console.log(user))
     console.log(user,"sendmesage")
     io.to(user?.socketId).emit("getMessage",{
        senderId,
        text  
     }) 
  })

  //when disocnnect
  socket.on("disconnect",()=>{
    console.log("A user Disconnected .....>>>>>>");
    removeUser(socket.id);
    removeNotificationUser(socket.id)
    io.emit("getUsers",users)
  })

})

 
dbConnection().then(()=>{
    appServer.listen(process.env.PORT,()=>console.log(`SERVER STARTED AT PORT:${process.env.PORT}`))
})       