import express from "express";
import bodyParser from "body-parser";
import lodash from "lodash";
import ejs from "ejs";

const app = express(); //this means we call the listen of deploying on app this is our server line
const port = 3000; // this is the port number we run on we made a variable to avoid mistaking the number if used more than once

const homeStartingContent =
  "This is where you can store your private inner thoughts without worrying that your journal gets stolen or someone invades your privacy and starts reading it";
const aboutContent =
  "This is just a mini drill to grasp the concepts of APIs and backend basics";
const contactContent =
  "Mail: zeyadamer285@gmail.com \n       Phone: 01018764627";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
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

app.get("/posts/:number", (req, res) => {
  posts.forEach((post) => {
    console.log(
      lodash.lowerCase(req.params.number) +
        "    " +
        lodash.lowerCase(post.Title)
    );

    if (lodash.lowerCase(req.params.number) === lodash.lowerCase(post.Title)) {
      console.log("match found!!!.");
      res.render("post.ejs", { Title: post.Title, Body: post.Body });
    } else console.log("not found");
  });
});

app.post("/compose", (req, res) => {
  res.render("compose.ejs");
  var post = {
    Title: req.body.postTitle,
    Body: req.body.postBody,
  };
  posts.push(post);
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
