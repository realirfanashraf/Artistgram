import express from 'express';
import { 
    changeProfilePicture, 
    editProfile, 
    newPost, 
    posts, 
    followUser 
} from '../../controller/userControllers/uploadController.js';

import { authenticateAndAuthorize } from '../../middleware/auth.js';

const router = express.Router();

const userAuthMiddleware = authenticateAndAuthorize('user');

router.post('/changeProfilePicture', userAuthMiddleware, changeProfilePicture);
router.post('/editProfile', userAuthMiddleware, editProfile);
router.post('/newPost', userAuthMiddleware, newPost);
router.get('/posts/:id', userAuthMiddleware, posts);
router.post('/followUser', userAuthMiddleware, followUser);

export default router;
