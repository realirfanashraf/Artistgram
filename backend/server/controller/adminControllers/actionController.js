import userSchema from "../../model/userModels/userModel.js";

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
