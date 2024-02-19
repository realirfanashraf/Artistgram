import { generateTokenAdmin } from "../../helper/generateToken.js";

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
