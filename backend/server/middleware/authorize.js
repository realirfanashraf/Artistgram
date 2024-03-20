import userSchema from "../model/userModels/userModel.js";

const adminEmail = process.env.ADMIN_EMAIL;

const authorize = (requiredRole) => async (req, res, next) => {
  const {email} = req.query

  try {
    if (email === adminEmail && requiredRole === 'admin') {
      return next();
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }


    if (user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authorize;
