import userSchema from "../../model/userModels/userModel.js";
import postSchema from "../../model/userModels/postModel.js";

export const getUserData = async (req, res) => {
    try {
      const userCountsByMonth = await userSchema.aggregate([
        {
          $project: {
            month: { $month: "$registrationDate" }, 
            _id: 0, 
          },
        },
        {
          $group: {
            _id: "$month", 
            count: { $sum: 1 },
          },
        },
      ]);

      const monthlyCounts = Array.from({ length: 12 }, (_, i) => 0);
  
      userCountsByMonth.forEach((monthCount) => {
        monthlyCounts[monthCount._id - 1] = monthCount.count;
      });
  
      return res.status(200).json({ monthlyUserCounts: monthlyCounts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error getting user data" });
    }
  };

export const getPostData = async (req, res) => {
    try {
        // Fetch posts data
        const posts = await postSchema.find();
        return res.status(200).json({ postData: posts });
    } catch (error) {
        return res.status(404).json({ error: "Error getting post data" });
    }
}
