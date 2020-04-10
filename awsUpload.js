const AWS = require('aws-sdk');
require('dotenv').config();

// Configuring AWS
AWS.config = new AWS.Config({
    accessKeyId: process.env.SECRET_ID, // stored in the .env file
    secretAccessKey: process.env.SECRET_KEY, // stored in the .env file
    region: process.env.REGION // This refers to your bucket configuration.
});

// Creating a S3 instance
const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
const Bucket = process.env.BUCKET;

// In order to create pre-signed GET adn PUT URLs we use the AWS SDK s3.getSignedUrl method.
// getSignedUrl(operation, params, callback) ⇒ String
// For more information check the AWS documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

// GET URL Generator
const generateGetUrl = (Key) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket,
            Key,
            Expires: 120 // 2 minutes
        };
        // Note operation in this case is getObject
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                reject(err);
            } else {
                // If there is no errors we will send back the pre-signed GET URL
                resolve(url);
            }
        });
    });
}

// PUT URL Generator
const generatePutUrl = (Key, ContentType) => {
    return new Promise((resolve, reject) => {
        // Note Bucket is retrieved from the env variable above.
        const params = { Bucket, Key, ContentType };
        // Note operation in this case is putObject
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) {
                reject(err);
            }
            // If there is no errors we can send back the pre-signed PUT URL
            resolve(url);
        });
    });
}

// Finally, we export the methods so we can use it in our main application.
module.exports = { generateGetUrl, generatePutUrl };

// AWS.config.update({ // setting up AWS config with our secrets
//     region: 'us-west-1', 
//     accessKeyId: process.env.SECRET_ID,
//     secretAccessKey: process.env.SECRET_KEY
// });

// const S3_BUCKET = process.env.S3_BUCKET // making our bucket into an easier variable

// const sign_s3 = (req, res) => {
//     const s3 = new AWS.S3(); // new s3 instance
//     const fileName = req.body.fileName;
//     const fileType = req.body.fileType;

//     const s3Params = { // set up the payload
//         Bucket: S3_BUCKET,
//         Key: fileName,
//         Expires: 500,
//         ContentType: fileType,
//         ACL: 'public-read'
//     };

//     s3.getSignedUrl('putObject', s3Params, (err, data) => {
//         if (err) {
//             console.log('error in awsUpload.js getSignedUrl', err);
//             res.json({ success: false, error: err });
//         }

//         const returnData = {
//             signedRequest: data,
//             url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileType}`
//         }
//         res.json({ success: true, data: {returnData} })
//     })

// }

// module.exports = sign_s3;