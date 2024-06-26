import userSchema from "../../model/userModels/userModel.js";
import postSchema from "../../model/userModels/postModel.js";
import reportSchema from "../../model/adminModels/reportModel.js"
import eventSchema from "../../model/adminModels/eventModel.js"

export const handleBlockUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isBlocked) {
            user.isBlocked = false;
            await user.save();
            return res.status(200).json({ message: 'User unblocked successfully' });
        }

        user.isBlocked = true;
        await user.save();
        return res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const blockPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { reportId } = req.body;
        const deletedReport = await reportSchema.findByIdAndDelete(reportId);
        if (!deletedReport) {
            return res.status(404).json({ message: "Report not found" });
        }
        const updatedPost = await postSchema.findByIdAndUpdate(postId, { isBlocked: true }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post blocked successfully" });
    } catch (error) {
        console.error("Error blocking post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const addEvent = async (req, res) => {
    try {
        const { title, description, imageUrl, date, location,amount } = req.body;

       
        const event = new eventSchema({
            title: title,
            description: description,
            image: imageUrl,
            date: date,
            location:location,
            amount:amount
        });

       
        await event.save();

        return res.status(200).json("Event added successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const blockEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const updatedEvent = await eventSchema.findOneAndUpdate(
            { _id: eventId },
            { isBlocked: true },
            { new: true } 
        );
        console.log(updatedEvent,"updates event is here")
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        res.status(200).json({ message: "Event blocked successfully", updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const unblockEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const updatedEvent = await eventSchema.findOneAndUpdate(
            { _id: eventId },
            { isBlocked: false },
            { new: true } 
        );
        console.log(updatedEvent,"updates event is here")
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        
        res.status(200).json({ message: "Event unblocked successfully", updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const editEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const editedEvent = req.body;
        
        const event = await eventSchema.findOneAndUpdate({ _id: eventId }, {
            $set: {
                location: editedEvent.location,
                description: editedEvent.description,
                date: editedEvent.date
            }
        }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}