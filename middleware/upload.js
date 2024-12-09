// middleware/uploadS3.js
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Set up AWS S3 credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY, // Your AWS access key
  secretAccessKey: process.env.AWS_SECRET_KEY, // Your AWS secret key
  region: process.env.AWS_REGION, // Your AWS region
});

// Set up Multer with S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-app-name-bucket',  // The name of your S3 bucket
    acl: 'public-read',  // Public read access for the file
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));  // Use timestamp for the file name
    }
  })
});

module.exports = { upload };
