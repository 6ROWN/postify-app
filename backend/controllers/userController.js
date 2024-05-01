const asyncHandler = require("express-async-handler");
const validator = require("validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateJWT");

//@ desc    REGISTER NEW USER
//@route    POST api/users/
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//Check if user enters email and password
	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	//Validate email
	if (!validator.isEmail(email)) {
		res.status(400);
		throw new Error("Email format is incorrect");
	}

	//Validate password
	if (!validator.isStrongPassword(password)) {
		res.status(400);
		throw new Error(
			"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		);
	}

	//Find user
	const user = await User.findOne({ email });

	//Check if user exist
	if (user) {
		res.status(400);
		throw new Error("Email already exist");
	}

	//gen salt
	const salt = await bcrypt.genSalt(10);

	//hash the password
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({ email, password: hashedPassword });

	//Generate token
	const token = generateToken(newUser._id);

	res.status(201).json({
		email,
		token,
	});
});

//@desc     login user
//@route    POST api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	//Ensure user already has an account
	const user = await User.findOne({ email });

	if (!user) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	//Ensure that password match

	const matchedPassword = await bcrypt.compare(password, user.password);

	if (!matchedPassword) {
		res.status(400);
		throw new Error("Invalid credentials");
	}

	//Generate json web token
	const token = generateToken(user._id);

	res.json({
		email,
		token,
	});
});

module.exports = { registerUser, loginUser };
