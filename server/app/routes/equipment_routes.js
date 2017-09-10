var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/collections/:id', (req, res) => {
        db.collection('collections').findOne({'_id': new ObjectID(req.params.id)}, (err, collection) =>
            res.send(err ? {'error': 'An error has occurred'} : collection));
    });

    app.post('/collections', (req, res) => {
        console.log(req.body);
        db.collection('collections').insertOne(req.body, (err, result) =>
            res.send(err ? {'error': 'An error has occurred'} : result.ops[0]));
    });

    app.put('/collections/:id', (req, res) => {
       const details = { '_id': new ObjectID(req.params.id) };
       db.collection('collections').updateOne(details, req.body, (err, result) =>
           res.send(err ? {'error': 'An error has occurred'} : result.ops[0]));
    });
};