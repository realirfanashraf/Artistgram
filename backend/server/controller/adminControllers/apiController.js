import { getPostCountsByMonth, getUserCountsByMonth } from "../../services/adminServices/adminServices.js";

export const getUserData = async (req, res) => {
    try {
        const result = await getUserCountsByMonth();
        if (result.success) {
            const monthlyCounts = Array.from({ length: 12 }, (_, i) => 0);
            let totalCount = 0; 
            result.data.forEach((monthCount) => {
                monthlyCounts[monthCount._id - 1] = monthCount.count;
                totalCount += monthCount.count; 
            });
            return res.status(200).json({ monthlyUserCounts: monthlyCounts, totalCount: totalCount }); // Send total count along with monthly counts
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
        const result = await getPostCountsByMonth();
        if (result.length > 0) {
            const monthlyCounts = Array.from({ length: 12 }, (_, i) => 0);
            let totalCount = 0; // Initialize total count
            result.forEach((monthCount) => {
                monthlyCounts[monthCount._id - 1] = monthCount.count;
                totalCount += monthCount.count; // Add each month's count to total count
            });
            return res.status(200).json({ monthlyPostCounts: monthlyCounts, totalCount: totalCount }); // Send total count along with monthly counts
        } else {
            return res.status(404).json({ error: "No data found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error getting post data" });
    }
};


