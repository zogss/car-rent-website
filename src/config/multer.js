import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { storageEngine as multerGCS } from 'multer-cloud-storage';

const MAX_SIZE_TWO_MEGABYTES = 5 * 1024 * 1024;

const s3 = new S3Client();

const storageType = {
  local: multer.diskStorage({
    destination: (...[, , cb]) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (...[, file, cb]) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.filename);

        cb(null, `${hash.toString('hex')}-${file.originalname}`);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (...[, file, cb]) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  gcloud: multerGCS({
    projectId: process.env.GCLOUD_PROJECT || '',
    bucket: process.env.GSC_BUCKET_NAME || '',
    credentials: {
      client_email: process.env.GSC_CLIENT_EMAIL || '',
      private_key: process.env.GSC_PRIVATE_KEY || '',
    },
    acl: 'publicRead',
    filename: (...[, file, cb]) => {
      let fileName = `${+new Date()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageType[process.env.STORAGE_TYPE || 'local'],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (...[, file, cb]) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
});

export default upload;
