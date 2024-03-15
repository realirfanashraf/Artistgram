import followSchema from '../../model/userModels/followModel.js';
import userSchema from '../../model/userModels/userModel.js';
import postSchema from '../../model/userModels/postModel.js'
import { getUserByEmail } from '../../services/userServices/authServices.js';
import reportSchema from '../../model/adminModels/reportModel.js'

export const usersList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const users = await userSchema.find().skip(skip).limit(limit);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const postsList = async (req,res)=>{
  const page = parseInt(req.query.postPage) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  try {
    const posts = await postSchema.find().skip(skip).limit(limit).populate({
      path:'postedBy'
    })
    res.json(posts)
  } catch (error) {
    console.log(error)
  }
}







export const followersList = async (req, res) => {
  const { email } = req.query;
  const user = await getUserByEmail(email)
  const userId = user._id

  try {
    const followers = await followSchema.find({ followingId: userId }).populate('followerId');
    console.log(followers,"followers")
    res.status(200).json(followers)
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const followingList = async(req,res)=>{
  const { email } = req.query;
  const user = await getUserByEmail(email)
  const userId = user._id

  try {
    const following = await followSchema.find({ followerId: userId }).populate('followingId');
    
    res.status(200).json(following)
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const reportPost = async (req, res) => {
  const { postId, message } = req.body;
  console.log(req.body,"sdjfkljas")
  try {
    const report = new reportSchema({
      post: postId,
      message: message
    });
    await report.save();
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
};