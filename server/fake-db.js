const Product = require('./models/product');
const User = require('./models/user');
const Booking = require('./models/cart');

const fakeDbData = require('./data.json');

class FakeDb{

	constructor(){
		this.products = fakeDbData.products;

		this.users = fakeDbData.users;
	}

	async cleanDb(){
		await User.remove({});
		await Product.remove({});
		await Booking.remove({});
	}

	pushDataToDb(){
		const user = new User(this.users[0]);
		const user1 = new User(this.users[1]);

		this.products.forEach((product)=>{
			const newProduct = new Product(product);
			newProduct.user = user;

			user.products.push(newProduct);

			newProduct.save();
		});

		user.save();
		user1.save();
	}

	async seedDb(){
		await this.cleanDb();
		this.pushDataToDb();
	}
}

module.exports = FakeDb;

/*
const Rental = require('./models/product');

class FakeDb{

	constructor(){
		this.rentals = [{
			title: "Nice view on ocean",
			category: "condo",
			quantity: 5,
			image: "https://booksync-jerga//img.jpeg",
			description: "Very nice apartment in center of the city",
			rating: 43
		},
		{
			title: "Nice view on ocean",
			category: "condo",
			quantity: 5,
			image: "https://booksync-jerga//img.jpeg",
			description: "Very nice apartment in center of the city",
			rating: 43
		},
		{
			title: "Nice view on ocean",
			category: "condo",
			quantity: 5,
			image: "https://booksync-jerga//img.jpeg",
			description: "Very nice apartment in center of the city",
			rating: 43
		}]
	}

	pushRentalsToDb(){
		this.products.forEach((product)=>{
			const newProduct = new Rental(product);

			newProduct.save();
		})
	}

	seedDb(){
		this.pushRentalsToDb();
	}
}

module.exports = FakeDb;
*/