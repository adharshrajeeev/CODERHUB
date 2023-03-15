const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const app=express();
const USERS=require('./model/users')
require('dotenv').config();
const {check,validationResult}= require('express-validator')



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/api/v1/login',[check("userName").notEmpty()],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const {userName,password,email}=req.body;
    USERS.create({
        userName,
        email,
        password
    }).then(()=>{
        res.status(200).json("sucess user created")
    }).catch((err)=>{
        res.status(500).json({error:err})
    })
})

mongoose.connect(process.env.MONGOURL)


app.listen(process.env.PORT,()=>console.log(`SERVER STARTED AT PORT:${process.env.PORT}`))