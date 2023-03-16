import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from  './routes/adminRoutes.js'





const app=express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

dbConnection();

app.use('/api',userRoutes)
app.use('/api/admin',adminRoutes)



app.listen(process.env.PORT,()=>console.log(`SERVER STARTED AT PORT:${process.env.PORT}`))