var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

	app.get('/notes', (req, res) => {

		db.collection('notes').find({}).toArray((err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});

	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		db.collection('notes').remove(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send('Note ' + id + ' deleted!');
			}
		});
	});

	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id) };
		const note = { Name: req.body.Name, Gender: req.body.Gender, Email: req.body.Email, Mobile: req.body.Mobile
			, Address1: req.body.Address1, Address2: req.body.Address2, State: req.body.State, City: req.body.City
			, ZipCode: req.body.ZipCode, Country: req.body.Country };
		db.collection('notes').update(details, note, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		});
	});

	app.post('/notes', (req, res) => {
		const note = { Name: req.body.Name, Gender: req.body.Gender, Email: req.body.Email, Mobile: req.body.Mobile
			, Address1: req.body.Address1, Address2: req.body.Address2, State: req.body.State, City: req.body.City
			, ZipCode: req.body.ZipCode, Country: req.body.Country};
		db.collection('notes').insert(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};