const MongoClient = require('mongodb').MongoClient,
  format = require('util').format;
const sequelize = require('sequelize');
const spawn = require('child_process').exec;




MongoClient.connect('mongodb://localhost/databasepower', function(err, db) {
  if (err) throw err;
  db.listCollections().toArray(function(err, collections) {
    collections.forEach(collection => {
      console.log(collection, 'collection');
      db.collection(collection.name).find({}).toArray((err, result) => {
        console.log(result, 'results');
      });
    });
  });
});


module.exports = {};
