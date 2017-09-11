const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) {
    return console.log(err);
  }
  require('./server/routes')(app, database);

  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log('We are live on ' + port);
  });
})
