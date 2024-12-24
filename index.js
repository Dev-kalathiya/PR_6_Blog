const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const blogRoutes = require("./blog/routes/blogRoutes");
const path = require("path");

// const userRoutes = require("./routes/userRoutes");
// const blogRoutes = require("./routes/blogRoutes");
const connection = require("./blog/config/db");
const router = require("./blog/routes/userRoutes");
const dbconnect = require("./blog/config/db");

const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", router );
app.use("/blog", blogRoutes);

app.listen(8090, () => {
  console.log("Server running on PORT 8090");
  dbconnect();
});
