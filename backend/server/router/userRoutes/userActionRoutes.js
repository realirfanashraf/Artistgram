import express from "express";
import { editPost, deletePost, paymentSession,paymentDone } from "../../controller/userControllers/userActionController.js";
import { authenticateAndAuthorize } from "../../middleware/auth.js";

const router = express.Router();

const userAuthMiddleware = authenticateAndAuthorize('user');

router.put('/posts/:postId', userAuthMiddleware, editPost);
router.delete('/deletePost/:postId', userAuthMiddleware, deletePost);
router.post('/payment-session',userAuthMiddleware,paymentSession)
router.post('/paymentDone',paymentDone)

export default router;
