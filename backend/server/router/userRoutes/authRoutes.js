import express from 'express'
import { signup,signin,verifyToken,logout } from '../../controller/userControllers/authController.js'
const route = express.Router()


route.post('/signup',signup)
route.post('/signin',signin)
route.get('/verifyToken',verifyToken)
route.get('/logout',logout)


export default route