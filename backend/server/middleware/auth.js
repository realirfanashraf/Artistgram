import jwt from 'jsonwebtoken';
import userSchema from '../model/userModels/userModel.js';

const adminEmail = process.env.ADMIN_EMAIL;

export const authenticateAndAuthorize = (requiredRole) => async (req, res, next) => {
    let token;
    let secretKey;
    if (requiredRole === 'admin') {
        token = req.cookies.jwtadmin;
        secretKey = process.env.JWT_secretKey_ADMIN;
    } else {
        token = req.cookies.jwtuser;
        secretKey = process.env.JWT_secretKey;
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded) {
            req.user = decoded;
            const { email } = decoded;
            if (email === adminEmail && requiredRole === 'admin') {
                return next();
            } else {
                const user = await userSchema.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }

                if (user.role !== requiredRole) {
                    return res.status(403).json({ message: 'Forbidden' });
                }

                if (user.isBlocked) {
                    res.clearCookie('jwtuser')
                    return res.status(403).json({ message: 'User is blocked' });
                }
                return next(); 
            }
        } else {
            res.status(401).json({ valid: false });
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ message: "Invalid token" });
    }
};
