import express from 'express'
const route = express.Router()
import { usersList , followersList,followingList} from '../../controller/userControllers/apiController.js'
import authorize from '../../middleware/authorize.js'


route.get('/users',authorize('user'),usersList)
route.get('/followers',authorize('user'),followersList)
route.get('/following',authorize('user'),followingList)



export default route