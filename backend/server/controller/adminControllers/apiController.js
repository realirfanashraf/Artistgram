import { getPostCountsByMonth, getUserCountsByMonth } from "../../services/adminServices/adminServices.js";
import userSchema from "../../model/userModels/userModel.js";
import reportSchema from "../../model/adminModels/reportModel.js"
import eventSchema from "../../model/adminModels/eventModel.js"
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
            let totalCount = 0; 
            result.forEach((monthCount) => {
                monthlyCounts[monthCount._id - 1] = monthCount.count;
                totalCount += monthCount.count;
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


export const getUsersDetail = async (req, res) => {
    try {

        const users = await userSchema.find()
        if (users) {
            res.status(200).json(users)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getReports = async (req,res)=>{

    try {
        const reports = await reportSchema.find({})
        .populate({
            path:'post',
            match: { isBlocked: false }
        }) 
        .populate('user') 
        
    console.log(reports);
        
        res.status(200).json(reports)
        
    } catch (error) {
        console.log(error)
    }
}

export const reportPostData = async(req,res)=>{
    try {
        const reportId = req.params.reportId;
       
        const reportData = await reportSchema.findById(reportId).populate(('post'))
        if (!reportData) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(reportData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const getEvents = async (req, res) => {
    try {
        const events = await eventSchema.find();
        if (events) {
            return res.status(200).json(events);
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getEventId = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await eventSchema.findById(eventId);
        if (event) {
            return res.status(200).json(event);
        } else {
            return res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



