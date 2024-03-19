import express from 'express'
const route = express.Router()
import { changeProfilePicture, editProfile, newPost, posts,followUser } from '../../controller/userControllers/uploadController.js'
import { authenticateUser } from '../../middleware/authMiddleware.js'
import authorize from '../../middleware/authorize.js'
import isBlocked from '../../middleware/isBlocked.js'


route.post('/changeProfilePicture', authenticateUser,authorize('user'),isBlocked,changeProfilePicture)
route.post('/editProfile', authenticateUser,authorize('user'),isBlocked,editProfile)
route.post('/newPost', authenticateUser, authorize('user'),isBlocked,newPost)
route.get('/posts/:id', authenticateUser, authorize('user'),isBlocked,posts)
route.post('/followUser',authenticateUser,authorize('user'),isBlocked,followUser)

export default route