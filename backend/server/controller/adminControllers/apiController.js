import postSchema from "../../model/userModels/postModel.js";
import { getUserCountsByMonth } from "../../services/adminServices/adminServices.js";



export const getUserData = async (req, res) => {
    try {
        const result = await getUserCountsByMonth();
        if (result.success) {
            const monthlyCounts = Array.from({ length: 12 }, (_, i) => 0);
            result.data.forEach((monthCount) => {
                monthlyCounts[monthCount._id - 1] = monthCount.count;
            });
            return res.status(200).json({ monthlyUserCounts: monthlyCounts });
        } else {
            console.error(result.error);
            return res.status(500).json({ error: "Error getting user data" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error getting user data" });
    }
};



export const getPostData = async (req, res) => {
    try {
        const posts = await postSchema.find();
        return res.status(200).json({ postData: posts });
    } catch (error) {
        return res.status(404).json({ error: "Error getting post data" });
    }
}
