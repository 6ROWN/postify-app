const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

// @desc    GET POST
// @routes  GET api/post
// @access  public
const getPosts = asyncHandler(async (req, res) => {
	const post = await Post.find().sort({ createdAt: -1 });

	res.status(200).json({
		message: "Get all posts",
		post,
	});
});

// @desc    GET USER POST
// @routes  GET api/post/user
// @access  private
const getUserPosts = asyncHandler(async (req, res) => {
	const post = await Post.find({ userId: req.user._id }).sort({
		createdAt: -1,
	});

	res.status(200).json({
		message: "Get user posts",
		post,
	});
});

// @desc    SET POST
// @routes  POST api/post
// @access  private
const setPost = asyncHandler(async (req, res) => {
	const { title, body } = req.body;
	if (!title || !body) {
		res.status(404).json({
			message: "Not found",
		});
	}

	// Extract userId from authenticated user
	const userId = req.user._id;

	const newPost = await Post.create({
		userId,
		title,
		body,
	});

	res.status(201).json({
		newPost,
	});
});

/**
 * @desc    Delete a post
 * @route   DELETE api/posts/:id
 * @access  Private
 */

const updatePost = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(404);
		throw new Error(`${id} not found`);
	}

	const post = await Post.findById(id);

	if (!post) {
		res.status(404);
		throw new Error(`${id} not found`);
	}

	//Check if the user owns this post
	if (!post.userId.equals(req.user._id)) {
		res.status(403);
		throw new Error("You are not authorized to edit this post");
	}

	const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	res.status(200).json({
		message: `ID ${id} updated successfully`,
		updatedPost,
	});
});

const deletePost = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({
			message: "Id field needed",
		});
	}

	const post = await Post.findById(id);

	if (!post) {
		res.status(404);
		throw new Error(`ID ${id} not found`);
	}

	await Post.deleteOne();

	//Check if the user owns this post
	if (!post.userId.equals(req.user._id)) {
		res.status(400);
		throw new Error("You are not authorized to edit this post");
	}

	res.status(200).json({
		message: `${id} ID deleted successfully`,
	});
});

module.exports = { getPosts, getUserPosts, setPost, updatePost, deletePost };
