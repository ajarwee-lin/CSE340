const express = require("express");
const dotenv = require("dotenv").config(); // Changed env to dotenv for clarity
const app = express();
const staticRoutes = require("./routes/static");

app.use(express.json()); // Added middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // Added middleware for parsing urlencoded bodies

// Serve static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css")); // Fixed path concatenation
app.use("/js", express.static(__dirname + "/public/js")); // Fixed path concatenation
app.use("/images", express.static(__dirname + "/public/images")); // Fixed path concatenation

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use("/", staticRoutes); // Changed from app.use(static) to use routes from staticRoutes

const port = process.env.PORT || 5500; // Set default port to 5500 if not defined in .env
const host = process.env.HOST || 'localhost'; // Set default host to 'localhost' if not defined in .env

app.listen(port, host, () => {
  console.log(`app listening on http://${host}:${port}`);
});
