import jwt from 'jsonwebtoken';

export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.jwtuser;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_secretKey);
        if (decoded) {
            next();
        } else {
            res.status(401).json({ valid: false });
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ message: "Invalid token" });
    }
};

export const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies.jwtAdmin;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_secretKey_ADMIN);
        if (decoded) {
            next();
        } else {
            res.status(401).json({ valid: false });
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ message: "Invalid token" });
    }
};
