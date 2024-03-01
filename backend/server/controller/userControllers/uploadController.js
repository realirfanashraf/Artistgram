import userSchema from '../../model/userModels/userModel.js'


export const changeProfilePicture = async(req,res)=>{
    const {email , imageUrl} = req.body
    try {
        const user = await userSchema.findOne({ email })
        
        if(user){
            user.ProfilePicture = imageUrl
        }
        await user.save()
        res.status(200).json({message:"Profile Picture changed"})
    } catch (error) {
        console.log(error)
    }
}


export const editProfile = async (req, res) => {
    const { email, name, bio, location } = req.body;

    try {
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.bio = bio;
        user.location = location;

        await user.save();

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error editing profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
