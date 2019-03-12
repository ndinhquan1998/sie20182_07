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