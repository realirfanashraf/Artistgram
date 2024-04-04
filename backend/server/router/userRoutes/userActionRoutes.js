import express from "express";
import { editPost ,deletePost} from "../../controller/userControllers/userActionController.js";
const route = express.Router()


route.put('/posts/:postId',editPost)
route.delete('/deletePost/:postId',deletePost)

export default route