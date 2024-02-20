import express from 'express'
import { signup,signin,verifyToken } from '../../controller/userControllers/authController.js'
const route = express.Router()


route.post('/signup',signup)
route.post('/signin',signin)
route.get('/verifyToken',verifyToken)


export default route