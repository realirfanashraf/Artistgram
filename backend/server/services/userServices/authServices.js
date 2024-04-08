import bcrypt from 'bcrypt';
import userSchema from '../../model/userModels/userModel.js'
import sendMail from '../../helper/sendMail.js';


export async function signupUser(name, email, password, verificationCode, code) {
  try {
    if (verificationCode == code) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userSchema.create({
        name: name,
        email: email,
        password: hashedPassword
      });

      return { success: true, message: "Signed up successfully" };
    } else {
      return { success: false, error: 'Invalid verification code' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error" };
  }
}


export async function signinUser(email, password) {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
      if (user.isBlocked) {
        return { success: false, error: "Your account is blocked" };
      }

      return {
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          ProfilePicture: user.ProfilePicture || null,
          bio: user.bio || null,
          location: user.location || null
        }
      };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  } catch (error) {
    console.error("Error signing in:", error);
    return { success: false, error: "Internal server error" };
  }
}



export const forgotPasswordService = async (email) => {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    const subject = 'Forgot Password Request';
    const text = `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n`
      + `Your verification code is: ${code}\n\n`
      + `If you did not request this, please ignore this email.\n`;

    const isEmailSent = await sendMail(email, subject, text);

    if (isEmailSent) {
      return { success: true, message: 'Email sent successfully', code };
    } else {
      return { success: false, message: 'Error sending email' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Server Error' };
  }
};


export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


export const getUserByEmail = async (email) => {
  return await userSchema.findOne({ email });
};


export const authenticateUser = async (user, password) => {
  if (!user) {
    return { error: 'User not found' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: 'Current password is incorrect' };
  }

  return { success: true, user };
};


export const sendVerificationEmail = async (email, code) => {
  const subject = 'Sign-in Verification';
  const text = `You are receiving this because you (or someone else) have requested to sign in to your account.\n\n`
    + `Your verification code is: ${code}\n\n`
    + `If you did not request this, please ignore this email.\n`;

  return await sendMail(email, subject, text);
};
