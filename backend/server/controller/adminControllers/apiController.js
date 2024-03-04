import userSchema from "../../model/userModels/userModel.js";
import postSchema from "../../model/userModels/postModel.js";

export const getUserData = async (req, res) => {
    try {
        // Fetch users data
        
        const users = await userSchema.find();
       
        return res.status(200).json({ userData: users });
    } catch (error) {
        return res.status(404).json({ error: "Error getting user data" });
    }
}

export const getPostData = async (req, res) => {
    try {
        // Fetch posts data
        const posts = await postSchema.find();
        return res.status(200).json({ postData: posts });
    } catch (error) {
        return res.status(404).json({ error: "Error getting post data" });
    }
}
