import mongoose from "mongoose";
import aws from "aws-sdk";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema(
  {
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
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    key: { type: String, required: true },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre("save", () => {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre("updateOne", () => {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre("remove", () => {
  try {
    if (process.env.STORAGE_TYPE === "s3") {
      return s3
        .deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: this.key,
        })
        .promise()
        .then((response) => {
          console.log(response.status);
        })
        .catch((response) => {
          console.log(response.status);
        });
    } else {
      return promisify(fs.unlink)(
        path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", this.key)
      );
    }
  } catch (error) {}
});

export default mongoose.model("Posts", PostSchema);
