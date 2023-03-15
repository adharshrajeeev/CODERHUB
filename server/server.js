import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import userRoutes from './routes/userRoutes.js'





const app=express();
dotenv.config()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dbConnection();

app.use('/api',userRoutes)



app.listen(process.env.PORT,()=>console.log(`SERVER STARTED AT PORT:${process.env.PORT}`))