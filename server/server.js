const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const app=express();
require('dotenv').config();
const PORT=process.env.PORT


app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGOURL)


app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT:${PORT}`))