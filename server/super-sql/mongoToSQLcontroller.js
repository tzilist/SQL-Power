// const MongoClient = require('mongodb').MongoClient,
//   format = require('util').format;
// const Sequelize = require('sequelize');
// const pg = require('pg');
//
//
// const sequelize = new Sequelize('databasepower', 'test', 'hi', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
//
//
// MongoClient.connect('mongodb://localhost/databasepower', function(err, db) {
//   if (err) throw err;
//   db.listCollections().toArray(function(err, collections) {
//     collections.forEach(collection => {
//       var schema = {
//         _id: {
//           type: Sequelize.INTEGER,
//           primaryKey: true,
//           autoIncrement: true
//         }
//       };
//
//       db.collection(collection.name).find({}).toArray((err, result) => {
//         for (var keys in result[0]) {
//           var keyHolder = '';
//           if(keys === '_id') keyHolder = 'id';
//           else {
//             keyHolder = keys;
//           }
//           switch (result[0].constructor) {
//             case String:
//               schema[keyHolder] = Sequelize.STRING;
//               break;
//             case Number:
//               schema[keyHolder] = Sequelize.FLOAT;
//               break;
//             case Array:
//               schema[keyHolder] = Sequelize.JSON;
//               break;
//             case Object:
//               schema[keyHolder] = Sequelize.JSON;
//               break;
//             case Date:
//               schema[keyHolder] = Sequelize.DATE;
//               break;
//           }
//         }
//
//         var NewSchema = sequelize.define(collection.name, schema);
//         sequelize.sync().then(function() {
//           result.forEach(val => {
//             var createdObj = {};
//             for(var keys in val) {
//               var keyHolder = '';
//               if(keys === '_id') keyHolder = 'id';
//               else {
//                 keyHolder = keys;
//               }
//               createdObj[keyHolder] = val[keys];
//             }
//             NewSchema.create(createdObj);
//           });
//         }).bind(this);
//       });
//     });
//   });
// });
//
//
// module.exports = {};
