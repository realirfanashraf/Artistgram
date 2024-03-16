import userSchema from "../../model/userModels/userModel.js";
import postSchema from "../../model/userModels/postModel.js"

export async function getUserCountsByMonth() {
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
        return { success: true, data: userCountsByMonth };
    } catch (error) {
        return { success: false, error: `Error retrieving user counts by month: ${error.message}` };
    }
}


export async function getPostCountsByMonth() {
    try {
        return await postSchema.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}