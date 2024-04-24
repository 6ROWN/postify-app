const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization || !authorization.startsWith("Bearer")) {
		res.status(403);
		throw new Error("No token provided");
	}

	// Extract the token
	const token = authorization.split(" ")[1];

	try {
		// Verify the token by extracting the id
		const { id } = jwt.verify(token, process.env.JWT_SECRET);

		// Find user associated with user
		const user = await User.findById(id).select("_id");

		if (!user) {
			res.status(403);
			throw new Error("Invalid token");
		}

		// Attach user object to req for further processing
		req.user = user;

		next();
	} catch (error) {
		res.status(403);
		throw new Error("Invalid token");
	}
});

module.exports = { verifyToken };
