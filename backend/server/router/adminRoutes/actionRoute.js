import express from 'express'
import { handleBlockUser , blockPost,addEvent,deleteEvent } from '../../controller/adminControllers/actionController.js'
import authorize from '../../middleware/authorize.js'
import {authenticateAdmin} from '../../middleware/authMiddleware.js'
const route = express.Router()


route.post('/handleBlockUser/:userId',authorize('admin'),authenticateAdmin, handleBlockUser)
route.post('/blockPost/:postId', authorize('admin'),authenticateAdmin, blockPost)
route.post('/addEvent',authorize('admin'),authenticateAdmin,addEvent)
route.post('/deleteEvent/:eventId',authorize('admin'),authenticateAdmin,deleteEvent)

export default route