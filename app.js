const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const lodash = require("lodash");
const { default: mongoose } = require("mongoose");

const app = express(); //this means we call the listen of deploying on app this is our server line
const port = 3000; // this is the port number we run on we made a variable to avoid mistaking the number if used more than once

mongoose.connect(process.env.mon);

const postSchema = {
  title: String,

  content: String,
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent =
  "This is where you can store your private inner thoughts without worrying that your journal gets stolen or someone invades your privacy and starts reading it";
const aboutContent =
  "This is just a mini drill to grasp the concepts of APIs and backend basics";
const contactContent =
  "Mail: zeyadamer285@gmail.com \n       Phone: 01018764627";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const posts = await Post.find({});

  res.render("home.ejs", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.get("/posts/:postId", async (req, res) => {
  const id = req.params.postId;
  const post = await Post.findById(id);
  res.render("post.ejs", { Title: post.title, Body: post.content });
});

app.post("/compose", async (req, res) => {
  res.render("compose.ejs");
  const post = await Post.create({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
