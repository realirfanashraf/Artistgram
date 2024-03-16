import express from 'express'
const route = express.Router()
import { changeProfilePicture, editProfile, newPost, posts,followUser } from '../../controller/userControllers/uploadController.js'
import { authenticateUser } from '../../middleware/authMiddleware.js'
import authorize from '../../middleware/authorize.js'


route.post('/changeProfilePicture', authenticateUser,authorize('user'), changeProfilePicture)
route.post('/editProfile', authenticateUser,authorize('user'), editProfile)
route.post('/newPost', authenticateUser, authorize('user'),newPost)
route.get('/posts/:id', authenticateUser, authorize('user'),posts)
route.post('/followUser',authenticateUser,authorize('user'),followUser)

export default route