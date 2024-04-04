import express from "express";
import { editPost } from "../../controller/userControllers/userActionController.js";
const route = express.Router()


route.put('/posts/:postId',editPost)

export default route