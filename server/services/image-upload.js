/*const aws = require('aws-sdk');
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

module.exports = upload; */  

const cloudinary = require('cloudinary');
const HttpStatus = require('http-status-codes');

const Product = require('../models/product');

cloudinary.config({
    cloud_name: 'dacecwexu',
    api_key: '769928176455911',
    api_secret: 'HZphonEaNSQYlUgx4SiZxtcZQi8'
});

module.exports = {
    UploadImage(req,res) {
        cloudinary.uploader.upload(req.body.image, async result => {

          

    /*        await Product.update(
                {
                    _id: req.user._id
                },
                {
                    $push: {
                        images: {
                            imgId: result.public_id,
                            imgVersion: result.version
                        }
                    }
                }
            ).then(() => res.status(HttpStatus.OK).json({ message: 'Image uploaded successfully' })
            ).catch(err => 
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error occured' })    
            );*/
        });
    },

    async SetDefaultImage(req, res) {
        const { imgId, imgVersion } = req.params;

        await Product.update(
            {
                _id: req.user._id
            },
            {
                picId: imgId,
                picVersion: imgVersion
            }
        ).then(() => res.status(HttpStatus.OK).json({ message: 'Default image set' })
        ).catch(err => 
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Error occured' })    
        );
    }
}



