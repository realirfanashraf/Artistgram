import express from 'express';
import { 
    usersList,
    getEvents,
    usersToChat,
    postDetails,
    followersList,
    followingList,
    followUser,
    unfollowUser,
    postsList,
    reportPost,
    getMessages,
    getRating,
    submitRating,
    remoteUserDetails 
} from '../../controller/userControllers/apiController.js';

import { authenticateAndAuthorize } from '../../middleware/auth.js';

const router = express.Router();

const userAuthMiddleware = authenticateAndAuthorize('user');

router.get('/users', userAuthMiddleware, usersList);
router.get('/posts', userAuthMiddleware, postsList);
router.get('/followers', userAuthMiddleware, followersList);
router.get('/following', userAuthMiddleware, followingList);
router.post('/reportPost', userAuthMiddleware, reportPost);
router.get('/messages/:userId', userAuthMiddleware, getMessages);
router.get('/rating/:postId', userAuthMiddleware, getRating);
router.post('/ratePost/:postId', userAuthMiddleware, submitRating);
router.post('/follow/:followerId', userAuthMiddleware, followUser);
router.post('/unfollow/:followerId', userAuthMiddleware, unfollowUser);
router.get('/getEvents', userAuthMiddleware, getEvents);
router.get('/usersToChat', userAuthMiddleware, usersToChat);
router.get('/posts/:postId', userAuthMiddleware, postDetails);
router.get('/remoteUserDetails/:userId',userAuthMiddleware,remoteUserDetails)

export default router;
