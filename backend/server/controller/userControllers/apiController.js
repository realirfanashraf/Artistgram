import followSchema from '../../model/userModels/followModel.js';
import userSchema from '../../model/userModels/userModel.js';
import postSchema from '../../model/userModels/postModel.js'
import { getUserByEmail } from '../../services/userServices/authServices.js';
import reportSchema from '../../model/adminModels/reportModel.js'
import messageSchema from '../../model/userModels/messageModel.js';
import ratingSchema from '../../model/userModels/ratingModel.js';
import eventSchema from '../../model/adminModels/eventModel.js'
import paymentSchema from '../../model/adminModels/paymentModel.js'




export const usersList = async (req, res) => {
  const { email } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const currentUser = await getUserByEmail(email);
    const users = await userSchema.find({ email: { $ne: currentUser.email } }).skip(skip).limit(limit); // Exclude current user
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const postsList = async (req, res) => {
  const page = parseInt(req.query.postPage) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;
  try {
    const posts = await postSchema
      .find({ isBlocked: false })
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'postedBy'
      });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const followersList = async (req, res) => {
  const { userId } = req.query;
  try {
    const followers = await followSchema.find({ followingId: userId }).populate('followerId');
    const following = await followSchema.find({ followerId: userId }).populate('followingId');
    res.status(200).json({ followers, following })
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const followingList = async (req, res) => {
  const { userId } = req.query;

  try {
    const following = await followSchema.find({ followerId: userId }).populate('followingId');
    res.status(200).json(following);
  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const reportPost = async (req, res) => {
  const { postId, message, userId } = req.body;
  try {
    const report = new reportSchema({
      post: postId,
      message: message,
      user: userId
    });
    await report.save();
    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
};


export const getMessages = async (req, res) => {
  try {
    const messages = await messageSchema
      .find({
        $or: [
          { sender: req.params.userId },
          { receiver: req.params.userId }
        ]
      })
      .populate('sender receiver')
      .exec();
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getRating = async (req, res) => {
  try {
    const postId = req.params.postId;
    const ratings = await ratingSchema.find({ PostId: postId });

    if (ratings.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const sum = ratings.reduce((acc, curr) => acc + curr.Value, 0);
    const averageRating = sum / ratings.length;
    res.status(200).json({ averageRating });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const submitRating = async (req, res) => {
  try {
    const { postId } = req.params;
    const email = req.query.email;
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;

    const { rating } = req.body;
    const post = await postSchema.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingRating = await ratingSchema.findOne({ PostId: postId, UserId: userId });

    if (existingRating) {
      existingRating.Value = rating;
      await existingRating.save();
    } else {
      await ratingSchema.create({ PostId: postId, UserId: userId, Value: rating });
    }

    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const followUser = async (req, res) => {
  try {
    const followerId = req.params.followerId;
    const { userId } = req.query;
    const followingId = userId

    const existingFollow = await followSchema.findOne({ followerId: followingId, followingId: followerId });
    if (existingFollow) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    const follow = new followSchema({
      followerId: followingId,
      followingId: followerId
    });
    await follow.save();
    const user = await userSchema.findById(userId)
    const data = {
      userToSend :followerId,
      user:user
    }
    

    res.status(200).json({ message: 'User followed successfully',data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const followingId = req.params.followerId;
    const followerId = userId
    const follow = await followSchema.findOneAndDelete({ followerId: followerId, followingId: followingId });

    if (!follow) {
      return res.status(404).json({ message: 'Follow relationship not found' });
    }

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error('Error in unfollowUser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getEvents = async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Find all events that are not blocked
    const events = await eventSchema.find({ isBlocked: false });
    
    // Find events registered by the user
    const registeredEvents = await paymentSchema.find({ user: userId });
    
    if (events.length > 0) {
      if (registeredEvents.length > 0) {
        res.status(200).json({ events, registeredEvents });
      } else {
        res.status(200).json({ events });
      }
    } else {
      res.status(404).json({ message: "No events found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const usersToChat = async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch all unique users
    const senders = await messageSchema.distinct('sender');
    const receivers = await messageSchema.distinct('receiver');
    const users = [...new Set([...senders, ...receivers])];

    // Find the latest message for each user
    const latestMessages = {};
    for (const userId of users) {
      const latestMessage = await messageSchema.findOne({ $or: [{ sender: userId }, { receiver: userId }] })
        .sort({ timestamp: -1 });
      latestMessages[userId] = latestMessage ? latestMessage : null;
    }

    // Construct the response with unique users
    const uniqueUsersWithLatestMessage = {};
    for (const userId of users) {
      if (!(userId in uniqueUsersWithLatestMessage)) {
        uniqueUsersWithLatestMessage[userId] = {
          userId,
          latestMessage: latestMessages[userId]
        };
      }
    }

    // Convert the object to an array
    const usersArray = Object.values(uniqueUsersWithLatestMessage);

    // Sort users based on the timestamp of their latest message
    usersArray.sort((a, b) => (b.latestMessage?.timestamp || 0) - (a.latestMessage?.timestamp || 0));

    for(let users of usersArray){
      const user = await userSchema.findById(users.userId)
      users.userId = user
    }
    // Send the response
    res.status(200).json(usersArray);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







export const postDetails = async (req, res) => {
  try {
    const postId = req.params.postId;

    const postDetails = await postSchema.findById(postId); 

    if (postDetails) {
      return res.status(200).json(postDetails);
    } else {
      return res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




export const remoteUserDetails = async (req, res) => {
  try {
      const userId = req.params.userId
      const userData = await userSchema.findById(userId);
      const postsData = await postSchema.find({ postedBy: userId });
      if (userData) {
          res.status(200).json({ userData, postsData });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



  
  