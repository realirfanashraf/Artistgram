import express from 'express';
import { 
    handleBlockUser,
    blockPost, 
    addEvent, 
    deleteEvent, 
    editEvent 
} from '../../controller/adminControllers/actionController.js';

import { authenticateAndAuthorize } from '../../middleware/auth.js';

const router = express.Router();

const adminAuthMiddleware = authenticateAndAuthorize('admin');

router.post('/handleBlockUser/:userId', adminAuthMiddleware, handleBlockUser);
router.post('/blockPost/:postId', adminAuthMiddleware, blockPost);
router.post('/addEvent', adminAuthMiddleware, addEvent);
router.post('/deleteEvent/:eventId', adminAuthMiddleware, deleteEvent);
router.post('/editEvent/:eventId', adminAuthMiddleware, editEvent);

export default router;
