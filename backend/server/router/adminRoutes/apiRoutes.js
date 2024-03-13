import express from 'express'
import { getUserData, getPostData, getUsersDetail } from '../../controller/adminControllers/apiController.js'
import authorize from '../../middleware/authorize.js'
const route = express.Router()

route.get('/usersData',authorize('admin'), getUserData)
route.get('/postsData',authorize('admin'), getPostData)
route.get('/getUsersDetail',authorize('admin'), getUsersDetail)


export default route