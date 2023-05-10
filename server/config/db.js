import mongoose from "mongoose"

const connectDb= async ()=>{
    const connection=await mongoose.connect(process.env.MONGOURL,{ useNewUrlParser: true, useUnifiedTopology: true  })
    .then(()=>{
        console.log(`DATABASE CONNECTED `)
    })
    .catch((err)=>{
        console.log(err)
    })
}
 
export default  connectDb