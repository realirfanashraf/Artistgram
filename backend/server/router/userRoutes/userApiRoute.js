import express from 'express'
const route = express.Router()
import { usersList , followersList,followingList , postsList,reportPost,getMessages} from '../../controller/userControllers/apiController.js'
import authorize from '../../middleware/authorize.js'


route.get('/users',authorize('user'),usersList)
route.get('/posts',authorize('user'),postsList)
route.get('/followers',authorize('user'),followersList)
route.get('/following',authorize('user'),followingList)
route.post('/reportPost',authorize('user'),reportPost)
route.get('/messages/:userId',authorize('user'), getMessages);




export default route