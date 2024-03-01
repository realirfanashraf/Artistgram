import express from 'express'
const route = express.Router()
import { changeProfilePicture, editProfile } from '../../controller/userControllers/uploadController.js'

route.post('/changeProfilePicture',changeProfilePicture)
route.post('/editProfile',editProfile)

export default route