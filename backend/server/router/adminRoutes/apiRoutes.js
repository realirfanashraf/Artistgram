import express from 'express'
import { getUserData, getPostData, getUsersDetail } from '../../controller/adminControllers/apiController.js'
const route = express.Router()

route.get('/usersData', getUserData)
route.get('/postsData', getPostData)
route.get('/getUsersDetail', getUsersDetail)


export default route