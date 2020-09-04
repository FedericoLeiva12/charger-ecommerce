const server = require('express').Router();
const { Categories } = require('../db.js');

server.post('/', (req, res) => {
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
server.get('/', (req, res) => {
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


server.get('/:id',(req, res) =>{
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
server.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body.data;

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
server.delete('/:id', (req, res) => {
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