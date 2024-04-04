import postSchema from "../../model/userModels/postModel.js";

export const editPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { description } = req.body;

        const post = await postSchema.findById(postId);

        if (post) {
            post.description = description;

            await post.save();

            res.status(200).json({ message: "Post updated successfully" });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await postSchema.findByIdAndDelete(postId);
      if (post) {
        res.status(200).json({ success: true, message: "Post deleted successfully." });
      } else {
        res.status(404).json({ success: false, message: "Post not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while deleting the post." });
    }
  };
  
