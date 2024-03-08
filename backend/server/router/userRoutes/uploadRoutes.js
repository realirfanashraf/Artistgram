import express from 'express'
const route = express.Router()
import { changeProfilePicture, editProfile, newPost, posts } from '../../controller/userControllers/uploadController.js'
import { authenticateUser } from '../../middleware/authMiddleware.js'

route.post('/changeProfilePicture', authenticateUser, changeProfilePicture)
route.post('/editProfile', authenticateUser, editProfile)
route.post('/newPost', authenticateUser, newPost)
route.get('/posts/:id', authenticateUser, posts)

export default route