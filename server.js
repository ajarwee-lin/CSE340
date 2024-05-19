const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const staticRoutes = require("./routes/static");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/images", express.static(__dirname + "/public/images"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use("/", staticRoutes);

const port = process.env.PORT || 5500;
const host = process.env.HOST || '0.0.0.0'; // Changed 'localhost' to '0.0.0.0'

app.listen(port, host, () => {
  console.log(`app listening on http://${host}:${port}`);
});

