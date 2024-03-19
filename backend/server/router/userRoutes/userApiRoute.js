import express from 'express'
const route = express.Router()
import { usersList , followersList,followingList , postsList,reportPost,getMessages,getRating,submitRating} from '../../controller/userControllers/apiController.js'
import authorize from '../../middleware/authorize.js'
import isBlocked from '../../middleware/isBlocked.js'

route.get('/users',authorize('user'),isBlocked,usersList)
route.get('/posts',authorize('user'),isBlocked,postsList)
route.get('/followers',authorize('user'),isBlocked,followersList)
route.get('/following',authorize('user'),isBlocked,followingList)
route.post('/reportPost',authorize('user'),isBlocked,reportPost)
route.get('/messages/:userId',authorize('user'),isBlocked,getMessages);
route.get('/rating/:postId',authorize('user'),isBlocked,getRating)
route.post('/ratePost/:postId',authorize('user'),isBlocked,submitRating)

export default route