import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { S3Client } from '@aws-sdk/client-s3';

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
      ref: 'User',
      required: true,
    },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    key: { type: String, required: true },
    url: { type: String },
  },
  {
    timestamps: true,
  },
);

PostSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

PostSchema.pre('updateOne', function () {
  const update = this.getUpdate();
  if (!update.url && update.key) {
    update.url = `${process.env.APP_URL}/files/${update.key}`;
  }
});

PostSchema.pre('remove', async function () {
  try {
    if (process.env.STORAGE_TYPE === 's3') {
      const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
      const s3Client = new S3Client({ region: process.env.AWS_REGION });
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: this.key,
      });
      await s3Client.send(command);
    } else {
      return promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.key),
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export default mongoose.model('Posts', PostSchema);
