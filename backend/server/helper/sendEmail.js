import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendEmail = async (email, res) => {
    try {
        const OTP = Math.floor(100000 + Math.random() * 900000)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        //--- configure mail content---
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: "Mail Validation",
            html: `<b>Your OTP is ${OTP}</b>`,
        }

        //   ---send Email----
        try {
            const info = await transporter.sendMail(mailOption)
            console.log("mail sended successfully")
            
        } catch (error) {
            console.log("email send failed with error", error)
        }

        return OTP

    } catch (error) {
        console.log("error", error)
    }
}