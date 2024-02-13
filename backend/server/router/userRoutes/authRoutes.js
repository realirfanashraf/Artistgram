import express from 'express'
import { signup } from '../../controller/userControllers/authController.js'
const route = express.Router()


route.post('/signup',signup)


export default route