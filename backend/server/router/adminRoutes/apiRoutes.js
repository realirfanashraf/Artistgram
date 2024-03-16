import express from 'express'
import { getUserData, getPostData, getUsersDetail,getReports } from '../../controller/adminControllers/apiController.js'
import authorize from '../../middleware/authorize.js'
const route = express.Router()

route.get('/usersData',authorize('admin'), getUserData)
route.get('/postsData',authorize('admin'), getPostData)
route.get('/getUsersDetail',authorize('admin'), getUsersDetail)
route.get('/getReports',authorize('admin'),getReports)


export default route