const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user');

const multer = require('multer');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dacecwexu',
    api_key: '769928176455911',
    api_secret: 'HZphonEaNSQYlUgx4SiZxtcZQi8'
});

var upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
            cb(new Error('not supported'), false)
            return
        }

        cb(null, true)
    }
})

router.post('/image-upload', upload.single('image'), async (req, res) => {

      const result = await cloudinary.v2.uploader.upload(req.file.path);
      console.log(result);
      res.json({'imageUrl': result.url});     
});

module.exports = router; 
