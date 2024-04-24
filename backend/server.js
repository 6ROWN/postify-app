const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
