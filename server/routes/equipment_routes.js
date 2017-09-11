var ObjectID = require('mongodb').ObjectID;

const COLLECTION_NAME = 'collections';

module.exports = function (app, db) {

  // Generic error handler used by all endpoints.
  function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

  app.get('/api/collections/:id', (req, res) => {
    db.collection(COLLECTION_NAME).findOne({'_id': new ObjectID(req.params.id)}, (err, collection) => {
      if (err) {
        handleError(res, err.message, "Failed to get collection");
      } else {
        res.status(200).json(collection);
      }
    });
  });

  app.post('/api/collections', (req, res) => {
    console.log(req.body);
    db.collection(COLLECTION_NAME).insertOne(req.body, (err, result) => {
      if (err) {
        handleError(res, err, "Failed to create collection")
      } else {
        res.status(201).json(result.ops[0]);
      }
    });
  });

  app.put('/api/collections/:id', (req, res) => {
    const details = {'_id': new ObjectID(req.params.id)};
    const collection = req.body;
    delete collection._id;
    db.collection(COLLECTION_NAME).updateOne(details, req.body, (err, result) => {
      if (err) {
        handleError(res, err.message, "Failed to update collection");
      } else {
        collection._id = req.params.id;
        res.status(200).json(collection);
      }
    });
  });
};
