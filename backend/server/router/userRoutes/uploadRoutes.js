import express from 'express'
const route = express.Router()
import { changeProfilePicture, editProfile,newPost,posts } from '../../controller/userControllers/uploadController.js'

route.post('/changeProfilePicture',changeProfilePicture)
route.post('/editProfile',editProfile)
route.post('/newPost',newPost)
route.get('/posts/:id',posts)

export default route