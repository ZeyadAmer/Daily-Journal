import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const PostSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const posts = mongoose.model("posts", PostSchema);
module.exports = postsSchema;
