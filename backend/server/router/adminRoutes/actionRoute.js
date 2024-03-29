import express from 'express'
import { handleBlockUser , blockPost,addEvent,deleteEvent } from '../../controller/adminControllers/actionController.js'
import authorize from '../../middleware/authorize.js'
const route = express.Router()


route.post('/handleBlockUser/:userId',authorize('admin'), handleBlockUser)
route.post('/blockPost/:postId', authorize('admin'), blockPost)
route.post('/addEvent',authorize('admin'),addEvent)
route.post('/deleteEvent/:eventId',authorize('admin'),deleteEvent)

export default route