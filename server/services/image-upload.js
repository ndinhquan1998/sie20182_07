const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/dev');
 
aws.config.update({
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPQG AND PNG is allowed!'), false);
    }
}
 
var upload = multer({
  fileFilter,

  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'bwm-ng-dev',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'Testing metadata'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;