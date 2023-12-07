const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "us-east-1", // Replace with your desired region
});

const s3 = new AWS.S3();

function uploadToS3(req, res, next) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const bucketName = process.env.bucketName;
  const fileName = req.file.originalname;
  const fileBuffer = req.file.buffer;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file to S3:", err.message);
      return res.status(500).send("File upload to S3 failed.");
    }

    console.log("File uploaded successfully to S3:", data.Location);

    // Attach the S3 upload result to the request object for use in subsequent middleware or routes
    req.s3UploadResult = data;

    next();
  });
}

module.exports = uploadToS3;