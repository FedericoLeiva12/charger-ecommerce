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
		res.status(200).send('The product was created succesfully: '+ product )
			if(!product.name||!product.price||!product.size||!product.material||!product.brand||!product.colors){
				res.send(400).send('Product need all properties to be created')
			}
	})
})

server.delete('/:productoId', (req, res) => {
	const { productoId } = req.params;

	if(productoId === undefined) {
		return res.status(400).send({ text: 'Invalid id' });
	}

	Product.destroy({
		where: {
			id: productoId
		}
	}).then(() => {
		res.status(200).send({ text: 'Product deleted' });
	}).catch(() => {
		res.status(500).send({ text: 'Internal error' });
	});
})

server.get('/category', (req, res) => {
	Categories.findAll({
		order: [
			['id', 'ASC']
		]
	}).then(cats => {
		res.send(cats);
	})
	.catch(err => {
		res.status(500).send({ text: 'Internal error.' });
		console.error(err);
	})
})

server.post('/category', (req, res) => {
	const {name} = req.body.data;
	
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
			
				category.save().then(() => res.send({text: 'Category created', category})).catch(() => res.status(500).send({text: 'Internal error'}));
			})
		}
	})
});

server.delete('/category/:id', (req, res) => {
	const { id } = req.params;

	if(id === undefined) {
		return res.status(400).send({ text: 'Invalid id' });
	}

	Categories.destroy({
		where: {
			id
		}
	}).then(() => {
		res.send({ text: 'Category deleted'});
	}).catch(() => {
		res.status(500).send({ text: 'Internal error'});
	})
});

server.put('/category/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body.data;

	if(id === undefined || name === undefined) {
		return requestAnimationFrame.status(400).send({ text: 'Invalid id' });
	}

	Categories.findOne({
		where: {
			id
		}
	}).then(cat => {
		cat.name = name;
		return cat.save();
	}).then(() => {
		res.send({ text: 'Category updated.' });
	}).catch(err => {
		res.status(500).send({ text: 'Internal error' });
	})
});
server.get('/category/:id',(req, res) =>{
	const { id } = req.params;
	if(id=== undefined){
		return res.status(400).send('You must use a valid id')
	}
	Product.findAll({
		where:{
			id
	}}).then(product=>{
		res.status(200).send(products)
	}).catch((err)=>{
		res.status(404).send('Page not found' + err)
	})

})

module.exports = server;
