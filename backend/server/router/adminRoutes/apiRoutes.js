import express from 'express';
import { 
    getUserData, 
    getPostData, 
    getUsersDetail, 
    getReports, 
    reportPostData, 
    getEventId, 
    getEvents 
} from '../../controller/adminControllers/apiController.js';

import { authenticateAndAuthorize } from '../../middleware/auth.js';

const router = express.Router();

const adminAuthMiddleware = authenticateAndAuthorize('admin');

router.get('/usersData', adminAuthMiddleware, getUserData);
router.get('/postsData', adminAuthMiddleware, getPostData);
router.get('/getUsersDetail', adminAuthMiddleware, getUsersDetail);
router.get('/getReports', adminAuthMiddleware, getReports);
router.get('/getReportData/:reportId', adminAuthMiddleware, reportPostData);
router.get('/getEventId/:eventId', adminAuthMiddleware, getEventId);
router.get('/getEvents', adminAuthMiddleware, getEvents);

export default router;
