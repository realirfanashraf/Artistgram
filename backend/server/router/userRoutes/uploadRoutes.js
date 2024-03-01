import express from 'express'
const route = express.Router()
import { changeProfilePicture, editProfile,newPost } from '../../controller/userControllers/uploadController.js'

route.post('/changeProfilePicture',changeProfilePicture)
route.post('/editProfile',editProfile)
route.post('/newPost',newPost)
export default route