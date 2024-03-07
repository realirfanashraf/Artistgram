import userSchema from "../../model/userModels/userModel.js";

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
