import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    trim: true,
  },
  valuePerDay: {
    type: String,
    required: true,
    trim: true,
  },
  plate: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  maxSpeed: {
    type: Number,
    required: true,
    trim: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Posts", PostSchema);
