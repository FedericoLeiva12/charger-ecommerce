const server = require('express').Router();
const { Product, Categories } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.post('/', (req,res) =>{
	Product.create({
		id:req.body.id,
		name:req.body.name,
		price:req.body.price,
		size:req.body.size,
		material:req.body.material,
		brand:req.body.brand,
		colors:req.body.colors
	}).then(product=>{
		res.status(200).send('Se ha creado el producto: '+ product )
			if(!product.name||!product.price||!product.size||!product.material||!product.brand||!product.colors){
				res.send(400).send('Product need all properties to be created')
			}
	})
})

module.exports = server;
