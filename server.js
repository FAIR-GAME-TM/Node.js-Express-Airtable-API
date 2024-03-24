// require the express module:
const express = require("express");

// create an instance of express:
const app = express();

// require the path module:
app.set("view engine", "ejs");

// Get Request:
app.get("/", function (req, res) {
  res.render("index", { text: "Demo" });
});

// app.use(express.static("public")); // Runs static files like HTML and CSS located in the public folder.
app.use(express.urlencoded({ extended: true })); // This is for parsing the data from the form.
app.use(express.json()); // This is for parsing JSON data.

// Set the path for the userRouter:
const userRouter = require("./routes/users");

// const postRouter = require("./routes/posts");

// This is for the user routing:
app.use("/users", userRouter);

// app.use("/posts", postRouter);

// Listen on port 3000:
app.listen(3000, function () {
  console.log("Listening on port 3000");
});
