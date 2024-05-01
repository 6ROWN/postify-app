const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User", // Reference to the User model
		},
		email: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to populate the email field based on the userId
postSchema.pre("save", async function (next) {
	try {
		const user = await mongoose.model("User").findById(this.userId);
		if (user) {
			this.email = user.email; // Set the email field in the post document
		} else {
			throw new Error("User not found");
		}
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model("Post", postSchema);
