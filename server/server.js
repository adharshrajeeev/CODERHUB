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

const io = new Server(appServer,{
    cors:{
        origin:'http://localhost:7000',
        methods:["GET","POST"]
    } 
}) 


 
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

io.on("connection",(socket)=>{
    console.log("User Connected",socket.id)
    io.emit("firstEvent","Hellow this is test")
 
    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })
})


dbConnection().then(()=>{
    appServer.listen(process.env.PORT,()=>console.log(`SERVER STARTED AT PORT:${process.env.PORT}`))
})