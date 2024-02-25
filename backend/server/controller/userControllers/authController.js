import userSchema from "../../model/userModels/userModel.js";
import bcrypt from 'bcrypt';
import { generateTokenUser } from "../../helper/generateToken.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
dotenv.config()


export const signup = async(req,res) => {
    const { name, email, password } = req.body;

    try {
        
        const exUser = await userSchema.findOne({ email });
        if (exUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userSchema.create({
            name: name,
            email: email,
            password: hashedPassword 
        });

        res.json({ message: "Signed up successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found"});
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (passwordMatched) {
            await generateTokenUser(res, user._id);
            return res.status(200).json({
                message: "Successfully Signed In",
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }else {
            return res.status(400).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const verifyToken = (req, res) => {
    const token = req.cookies.jwtuser;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
       
        const decoded = jwt.verify(token , process.env.JWT_secretKey)
        if(decoded){
            res.status(200).json({ valid: true });
        }else{
            res.status(401).json({valid:false})
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwtuser');
        res.status(200).json({ message: 'user logout successfully' });
    } catch (error) {
        console.log("error", error);
    }
};

export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userSchema.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const code = Math.floor(100000 + Math.random() * 900000); 
      user.resetPasswordCode = code;
      user.resetPasswordExpires = Date.now() + 3600000; 
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'process.env.ADMIN_EMAIL',
          pass: 'process.env.ADMIN_PASSWORD'
        }
      });
  
      const mailOptions = {
        from: 'process.env.ADMIN_EMAIL',
        to: email,
        subject: 'Reset Password',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
              + `Your verification code is: ${code}\n\n`
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'Email sent successfully' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };