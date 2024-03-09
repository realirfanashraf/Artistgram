import userSchema from '../../model/userModels/userModel.js'

export const usersList = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10; // Number of users per page
        const totalCount = await userSchema.countDocuments();
    
        const users = await userSchema.find()
          .skip((page - 1) * pageSize)
          .limit(pageSize);
    
        res.json({ users, totalCount });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };


