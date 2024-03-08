import express from 'express'
import { getUserData, getPostData } from '../../controller/adminControllers/apiController.js'
const route = express.Router()

route.get('/usersData', getUserData)
route.get('/postsData', getPostData)

export default route