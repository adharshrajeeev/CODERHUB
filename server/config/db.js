import mongoose from "mongoose"

const connectDb= async ()=>{
    const connection=await mongoose.connect(process.env.MONGOURL)
    .then(()=>{
        console.log(`DATABASE CONNECTED AT ${process.env.MONGOURL}`)
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default  connectDb