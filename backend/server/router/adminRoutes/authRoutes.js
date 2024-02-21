import express from "express";
import {Login , verifyToken} from '../../controller/adminControllers/authController.js'
const route = express.Router()

route.post('/login',Login)
route.get('/verifyToken',verifyToken)

export default route