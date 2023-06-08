const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.set("trust proxy", 1);

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static("public"));

// Routes
app.use("/api", require("./routes"));

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));