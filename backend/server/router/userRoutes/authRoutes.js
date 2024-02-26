import express from 'express'
import { signup,signin,verifyToken,logout,forgotPassword,changePassword } from '../../controller/userControllers/authController.js'
const route = express.Router()


route.post('/signup',signup)
route.post('/signin',signin)
route.get('/verifyToken',verifyToken)
route.get('/logout',logout)
route.post('/forgotPassword', forgotPassword)
route.post('/changePassword',changePassword)



export default route