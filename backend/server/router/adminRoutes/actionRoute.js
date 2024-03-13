import express from 'express'
import { handleBlockUser } from '../../controller/adminControllers/actionController.js'
import authorize from '../../middleware/authorize.js'
const route = express.Router()


route.post('/handleBlockUser/:userId',authorize('admin'), handleBlockUser)

export default route