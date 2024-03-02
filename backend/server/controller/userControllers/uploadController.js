import userSchema from '../../model/userModels/userModel.js'
import postSchema from '../../model/userModels/postModel.js'

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


export const newPost = async (req, res) => {
    try {
        const { caption, imageUrl, id } = req.body;

        const newPost = new postSchema({
            description: caption,
            image: imageUrl,
            postedBy: id
        });

        const savedPost = await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const posts = async(req,res)=>{
            
    try {
        const userId = req.params.id;

        const posts = await postSchema.find({postedBy : userId});

        console.log(posts , 'df');

        if(posts) {
            return res.json({posts});
        }
    } catch (error) {
        console.log(error)
        
    }
}