import express from "express";
import {Login} from '../../controller/adminControllers/authController.js'
const route = express.Router()

route.post('/login',Login)

export default route