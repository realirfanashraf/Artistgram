import userSchema from "../../model/userModels/userModel.js";
import bcrypt from 'bcrypt';
import { generateTokenUser } from "../../helper/generateToken.js";
import jwt from 'jsonwebtoken'
import sendMail from "../../helper/sendMail.js";
import { authenticateUser, forgotPasswordService, getUserByEmail, hashPassword, sendVerificationEmail, signinUser, signupUser } from "../../services/userServices/authServices.js";


export const signup = async (req, res) => {
  const { name, email, password, verificationCode } = req.body;
  try {
    const code = req.cookies.verificationCode;
    const result = await signupUser(name, email, password, verificationCode, code);

    if (result.success) {
      res.clearCookie('verificationCode');
      return res.json({ message: result.message });
    } else {
      return res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signinUser(email, password);
    if (result.success) {
      await generateTokenUser(res, result.user._id);
      return res.status(200).json({
        message: "Successfully Signed In",
        user: result.user
      });
    } else {
      return res.status(400).json({ error: result.error });
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
    const decoded = jwt.verify(token, process.env.JWT_secretKey)
    if (decoded) {
      res.status(200).json({ valid: true });
    } else {
      res.status(401).json({ valid: false })
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
    const result = await forgotPasswordService(email);

    if (result.success) {
      res.cookie('forgotPasswordOtp', result.code, { httpOnly: true });
      res.status(200).json({ message: result.message, code: result.code });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await getUserByEmail(email);
    const authenticationResult = await authenticateUser(user, currentPassword);

    if (authenticationResult.error) {
      return res.status(401).json({ message: authenticationResult.error });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
};



export const signUpMail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    const isEmailSent = await sendVerificationEmail(email, code);
    if (isEmailSent) {
      res.cookie('verificationCode', code, { httpOnly: true });
      return res.status(200).json({ message: 'Email sent successfully' });
    } else {
      return res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};



export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body.otp;
    const forgotPasswordOtp = req.cookies.forgotPasswordOtp;
    res.clearCookie('forgotPasswordOtp')

    if (!forgotPasswordOtp) {
      return res.status(404).json({ message: "Forgot password OTP cookie not found" });
    }

    if (forgotPasswordOtp === otp) {
      return res.status(200).json({ message: "Success: OTP verified" });
    } else {
      return res.status(400).json({ message: "Failed: OTP verification unsuccessful" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const newPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await hashPassword(newPassword)
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};