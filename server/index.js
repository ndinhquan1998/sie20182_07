const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const Product = require('./models/product');
const FakeDb = require('./fake-db');
const path = require('path');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const shoppingCartRoutes = require('./routes/carts');
const paymentRoutes = require('./routes/payments');
const imageUploadRouter = require('./routes/image-upload');

mongoose.connect(config.DB_URI).then(()=>{
	const fakeDb = new FakeDb();
	fakeDb.seedDb();
});

const app = express();

//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use("/images", express.static(path.join("server/images")));

app.use('/api/v1/products',productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/shoppingCarts', shoppingCartRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', imageUploadRouter);

const appPath = path.join(__dirname, '..', 'dist');
app.use(express.static(appPath));

app.get('*', function(req,res){
	res.sendFile(path.resolve(appPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
	console.log('Iam runnin!');
});