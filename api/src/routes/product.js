const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.post('/', (req,res,next) =>{
	Product.create({
		name:req.body.name,
		price:req.bofy.price,
		size:req.body.size,
		material:req.body.material,
		brand:req.body.brand,
		colors:req.body.colors
	}).then(product=>{
		res.status(201).send('Se ha creado el producto: '+ product )
	}).catch(next)
})

module.exports = server;
