import express from 'express'
const route = express.Router()
import { changeProfilePicture } from '../../controller/userControllers/uploadController.js'

route.post('/changeProfilePicture',changeProfilePicture)

export default route