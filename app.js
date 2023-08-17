import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express(); //this means we call the listen of deploying on app this is our server line
const port = 3000; // this is the port number we run on we made a variable to avoid mistaking the number if used more than once

const homeStartingConten = "";
const aboutContent = "";
const contactContent = "";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
