import { generateTokenAdmin } from "../../helper/generateToken.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const Login = async (req, res) => {
    const { email, password } = req.body; 

    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const adminId = process.env.ADMIN_ID;
            await generateTokenAdmin(res, adminId);
            res.status(200).json({ message: "Admin login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const verifyToken = (req, res) => {
    const token = req.cookies.jwtadmin;
    console.log(token,"no token from the backend")
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
       
        const decoded = jwt.verify(token , process.env.JWT_secretKey_ADMIN)
        console.log(decoded)

        if(decoded){
            res.status(200).json({ valid: true });
        }else{
            res.status(401).json({valid:false})
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
