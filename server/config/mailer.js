import nodemailer from 'nodemailer';
import MailGen from 'mailgen';


let nodeConfig={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports 
    auth: {
      user: process.env.EMAILID, // generated ethereal user
      pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
}

let transporter=  nodemailer.createTransport(nodeConfig);

let MailGenerator=new MailGen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:'https://mailgen.js'
    }
})

export const registerMail= async(req,res)=>{
    const {username,userEmail,text,subject}=req.body;
    //body of email
    var email={
        body:{
            name:username,
            intro:text || "welcome to adarsh",
            outro:"NEedd help "
        }
    }

    var emailBody=MailGenerator.generate(email);

    let message={
        from:"adharshrajeeev2000@gmail.com",
        to:userEmail,
        subject:subject || "signup success",
        html:emailBody
    }
}