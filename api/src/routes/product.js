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
	const {
		name, price, size, material, brand, colors
	} = req.body.data;

	if(!name || !price || !size || !material || !brand || !colors) {
		return res.status(400).send({ text: 'Invalid data' });
	}

	let newId;

	Product.findAll({
		order: [
			['id', 'DESC']
		],
		limit: 1
	}).then(prod => {
		if(!prod[0]) prod[0] = {id: -1};
		newId = prod[0].id + 1;
		return Product.create({
			id: newId,
			name, price, size, material, brand, colors
		});
	}).then(() => {
		res.send({ text: 'Product created', product: {
			id: newId,
			name, price, size, material, brand, colors
		}})
	}).catch(err => {
		res.status(500).send({ text: 'Internal error' });
		console.error(err);
	})
})

/*CRUD de Categorías*/

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
			
				category.save().then(() => res.send({text: 'Category created'})).catch(() => res.status(500).send({text: 'Internal error'}));
			})
		}
	})
});
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


server.get('/category/:id',(req, res) =>{
	const { id } = req.params;
	if(id=== undefined){
		return res.status(400).send('You must use a valid id')
	}
	Categories.findOne({
		where:{
			id
	}}).then(category=>{
		res.status(200).send(category)
	}).catch((err)=>{
		res.status(404).send('Page not found :' + err);
	})

})
server.put('/category/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body.data; /*Si vamos a manejar axios que sea a lo largo de todas las request. 
									 rear producto y modificar sus valores se tienen que poder hacer
									 a traves del mismo metodo de obtencion de data*/
	 

	if(id === undefined || name === undefined) {
		return res.status(400).send({ text: 'Invalid id' });
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

module.exports = server;
