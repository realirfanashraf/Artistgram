import express from 'express'
import { signup, signin, verifyToken, logout, forgotPassword, changePassword, signUpMail, verifyOtp, newPassword } from '../../controller/userControllers/authController.js'
const route = express.Router()


route.post('/signup', signup)
route.post('/signin', signin)
route.get('/verifyToken', verifyToken)
route.get('/logout', logout)
route.post('/forgotPassword', forgotPassword)
route.post('/changePassword', changePassword)
route.post('/signUpMail', signUpMail)
route.post('/verifyOtp', verifyOtp)
route.post('/newPassword', newPassword)


export default route