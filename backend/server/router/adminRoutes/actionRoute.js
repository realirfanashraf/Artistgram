import express from 'express'
import { handleBlockUser , newEvent,blockPost } from '../../controller/adminControllers/actionController.js'
import authorize from '../../middleware/authorize.js'
const route = express.Router()


route.post('/handleBlockUser/:userId',authorize('admin'), handleBlockUser)
route.post('/blockPost/:postId', authorize('admin'), blockPost)
route.post('/newEvent',newEvent)

export default route