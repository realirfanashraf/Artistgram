import express from 'express'
import { getUserData, getPostData, getUsersDetail,getReports,reportPostData,getEventId,getEvents } from '../../controller/adminControllers/apiController.js'
import authorize from '../../middleware/authorize.js'
import { authenticateAdmin } from '../../middleware/authMiddleware.js'
const route = express.Router()

route.get('/usersData',authorize('admin'),authenticateAdmin,getUserData)
route.get('/postsData',authorize('admin'),authenticateAdmin, getPostData)
route.get('/getUsersDetail',authorize('admin'),authenticateAdmin, getUsersDetail)
route.get('/getReports',authorize('admin'),authenticateAdmin,getReports)
route.get('/getReportData/:reportId',authorize('admin'),authenticateAdmin, reportPostData)
route.get('/getEventId/:eventId',authorize('admin'),authenticateAdmin,getEventId)
route.get('/getEvents',authorize('admin'),authenticateAdmin,getEvents)




export default route