import userSchema from "../../model/userModels/userModel.js";
import bcrypt from 'bcrypt';
import { generateTokenUser } from "../../helper/generateToken.js";
import jwt from 'jsonwebtoken'
import sendMail from "../../helper/sendMail.js";



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

    const code = Math.floor(100000 + Math.random() * 900000)

    const subject = 'Forgot Password Request';
    const text = `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n`
      + `Your verification code is: ${code}\n\n`
      + `If you did not request this, please ignore this email.\n`;

    const isEmailSent = await sendMail(email, subject, text);
    if (isEmailSent) {
      return res.status(200).json({ message: 'Email sent successfully', code });
    } else {
      return res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


  export const changePassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await userSchema.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10)
  
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const signUpMail = async(req,res)=>{
    try {
      const { email } = req.body;
  
      const code = Math.floor(100000 + Math.random() * 900000)
  
      const subject = 'Sign-in Verification';
      const text = `You are receiving this because you (or someone else) have requested to sign in to your account.\n\n`
        + `Your verification code is: ${code}\n\n`
        + `If you did not request this, please ignore this email.\n`;
  
      const isEmailSent = await sendMail(email, subject, text);
      if (isEmailSent) {
        return res.status(200).json({ message: 'Email sent successfully', code });
      } else {
        return res.status(500).json({ message: 'Error sending email' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }