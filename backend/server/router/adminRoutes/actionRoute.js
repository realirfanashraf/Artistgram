import express from 'express'
import { handleBlockUser } from '../../controller/adminControllers/actionController.js'
const route = express.Router()


route.post('/handleBlockUser/:userId', handleBlockUser)

export default route