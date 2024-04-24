const express = require("express");
const {
	getPosts,
	setPost,
	updatePost,
	deletePost,
	getUserPosts,
} = require("../controllers/postControllers");
const { verifyToken } = require("../middleware/authToken");

const router = express.Router();

router.route("/").get(getPosts).post(verifyToken, setPost);

router.route("/user").get(verifyToken, getUserPosts);

router
	.route("/:id")
	.put(verifyToken, updatePost)
	.delete(verifyToken, deletePost);

module.exports = router;
