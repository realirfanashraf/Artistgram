import express from 'express'
const route = express.Router()
import { usersList , followersList,followingList ,followUser,unfollowUser, postsList,reportPost,getMessages,getRating,submitRating} from '../../controller/userControllers/apiController.js'
import authorize from '../../middleware/authorize.js'
import isBlocked from '../../middleware/isBlocked.js'
import { authenticateUser } from '../../middleware/authMiddleware.js'

route.get('/users',authorize('user'),authenticateUser,isBlocked,usersList)
route.get('/posts',authorize('user'),authenticateUser,isBlocked,postsList)
route.get('/followers',authorize('user'),authenticateUser,isBlocked,followersList)
route.get('/following',authorize('user'),authenticateUser,isBlocked,followingList)
route.post('/reportPost',authorize('user'),authenticateUser,isBlocked,reportPost)
route.get('/messages/:userId',authorize('user'),authenticateUser,isBlocked,getMessages)
route.get('/rating/:postId',authorize('user'),authenticateUser,isBlocked,getRating)
route.post('/ratePost/:postId',authorize('user'),authenticateUser,isBlocked,submitRating)
route.post('/follow/:followerId',followUser)
route.post('/unfollow/:followerId',unfollowUser)

export default route