import userSchema from "../../model/userModels/userModel.js";
import bcrypt from 'bcrypt';
import { generateTokenUser } from "../../helper/generateToken.js";

export const signup = async(req,res) => {
    const { name, email, password } = req.body;

    try {
        
        const exUser = await userSchema.findOne({ email });
        if (exUser) {
            return res.json({ error: "User already exists" });
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
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            return res.status(400).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
