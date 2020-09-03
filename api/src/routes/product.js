const server = require('express').Router();
const { Product, Categories } = require('../db.js');

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

server.post('/category', (req, res) => {
	const {name} = req.body;
	
	if(!name || typeof name !== 'string' || name.length <= 0) {
		return res.status(400).send({text: 'Invalid name'});
	}
	Categories.findOne({
		where: {
			name
		}
	}).then(cat => {
		if(cat !== null) {
			return res.status(400).send({text: 'Category already exists'});
		} else {
			Categories.findAll({
				order: [
					['id', 'DESC']
				],
				limit: 1
			}).then(cat => {
				let newId = null;
				if(cat.length === 0) {
					newId = 0;
				} else {
					newId = cat[0].id + 1;
				}
			
				const category = Categories.build({
					id: newId,
					name
				});
			
				category.save().then(res.send({text: 'Category created'})).catch(res.status(500).send({text: 'Internal error'}));
			})
		}
	})
})

module.exports = server;
