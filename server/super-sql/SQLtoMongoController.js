const pg = require('pg');
const MongoClient = require('mongodb').MongoClient;
const async = require('async')
const uri = "postgres://postgres:postgres@localhost/booktown";


pg.connect(uri, function(err, client) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM pg_catalog.pg_tables;', function(err, result) {
    if (err) console.log(err);
    MongoClient.connect('mongodb://localhost/booktown', function(err, db) {
      result.rows.forEach(val => {
        if (val.schemaname === 'public') {
          db.createCollection(val.tablename);
          var collection = db.collection(val.tablename);
          client.query(`Select * from ${val.tablename}`, function(err, result) {
            result.rows.forEach(entry => {
              collection.insert(entry, function(err, result) {});
            });
          });
        }
      });
    });
  });
});




MongoClient.connect('mongodb://localhost/databasepower', function(err, db) {

});

module.exports = {};
