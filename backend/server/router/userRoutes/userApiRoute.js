import express from 'express'
const route = express.Router()
import { usersList } from '../../controller/userControllers/apiController.js'


route.get('/users',usersList)

export default route