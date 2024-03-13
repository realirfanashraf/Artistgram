import express from 'express'
const route = express.Router()
import { usersList } from '../../controller/userControllers/apiController.js'
import authorize from '../../middleware/authorize.js'


route.get('/users',authorize('user'),usersList)

export default route