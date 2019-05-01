const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const ProductCtrl = require('../controllers/product');

router.get('/secret', UserCtrl.authMiddleware,function(req,res){
	res.json({"secret":true});
});

router.get('/manage', UserCtrl.authMiddleware, ProductCtrl.getUserProduct);

router.get('/:id/verify-user', UserCtrl.authMiddleware, ProductCtrl.verifyProductUser);

router.patch('/:id', UserCtrl.authMiddleware, ProductCtrl.updateProduct);

router.get('/:id', ProductCtrl.getProductById);

router.delete('/:id', UserCtrl.authMiddleware, ProductCtrl.deleteProduct);

router.post('', UserCtrl.authMiddleware, ProductCtrl.createProduct);

router.get('',  ProductCtrl.getProductByName);



module.exports = router;