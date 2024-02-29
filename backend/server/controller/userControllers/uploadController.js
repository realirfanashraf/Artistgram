import userSchema from '../../model/userModels/userModel.js'


export const changeProfilePicture = async(req,res)=>{
    const {email , imageUrl} = req.body
    try {
        const user = await userSchema.findOne({ email })
        
        if(user){
            user.ProfilePicture = imageUrl
        }
        await user.save()
        res.status(200).json({message:"Success , Profile Picture changed, success"})
    } catch (error) {
        console.log(error)
    }
}

