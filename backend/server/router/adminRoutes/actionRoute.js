import express from 'express'
import { handleBlockUser , blockPost } from '../../controller/adminControllers/actionController.js'
import authorize from '../../middleware/authorize.js'
const route = express.Router()


route.post('/handleBlockUser/:userId',authorize('admin'), handleBlockUser)
route.post('/blockPost/:postId', authorize('admin'), blockPost)

export default route