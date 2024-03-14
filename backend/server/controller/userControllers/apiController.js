import followSchema from '../../model/userModels/followModel.js';
import userSchema from '../../model/userModels/userModel.js';
import { getUserByEmail } from '../../services/userServices/authServices.js';

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