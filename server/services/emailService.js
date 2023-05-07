import dotenv from 'dotenv'
import nodemailer  from 'nodemailer'


export const sendMail = async (to,subject,body)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    
      const message = {
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        html: body,
      };

      

      try {
        await transporter.sendMail(message);
        console.log(`Email sent to ${to} with subject: ${subject}`);
      } catch (error) {
        console.error(`Error sending email to ${to}: ${error}`);
        throw new Error('Error sending email');
      }
}