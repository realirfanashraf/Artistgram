import jwt from 'jsonwebtoken'


export const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwtuser;
    console.log('Token:', token);
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_secretKey);
        // console.log('Decoded token:', decoded);
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
