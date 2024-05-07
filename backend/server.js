const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");

const app = express();

connectDB();

// Enable CORS for all origins
app.use(cors());
// Enable CORS middleware
app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Origin",
		"http://localhost:5173",
		"https://postify-app.onrender.com"
	); // Allow requests from localhost:3000
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8081;

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
