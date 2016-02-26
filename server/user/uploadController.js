const fs = require('fs');
const path = require('path');
const multer = require('multer');
const exec = require('child_process').exec
const sqlToMongo = require('../super-sql/SQLtoMongoController');
const mongoToSql = require('../super-sql/mongoToSQLcontroller');
var child;




module.exports = {
  mkdir: function(req, res, next) {
    fs.mkdir(path.join(__dirname, `../../uploads/${req.cookies.ssid}`), (err) => {
      if (err) console.log(err);
      next();
    });
  },

  import: function(req, res, next) {
    if (req.file.path.indexOf('.sql') !== -1 || req.file.path.indexOf('.pgsql') !== -1) {
      var name = req.file.originalname.replace(/\.(.*)/g, '');
      child = exec(`sudo -u postgres createdb ${name}`, function(error, stdout, stderr) {
        child = exec(`sudo -u postgres psql ${name} < ${path.join(__dirname, '../../', req.file.path)}`, function(err, stdout, stderr) {
          console.log('imported')
          sqlToMongo(name, next)
        })
      });
    } else {
      console.log(req.body)
      var name = req.file.originalname.replace(/\.(.*)/g, '');
      child = exec(`mongoimport --db ${req.body.database_name} --collection ${name} --file ${path.join(__dirname, '../../', req.file.path)}`, function(err, stdout, stderr) {
        child = exec(`sudo -u postgres createdb ${req.body.database_name}`, function(err, stdout, stderr) {
          mongoToSql(req.body.database_name, next);
        })
      })
    }
  },

  export: function(req, res, next) {
    var name = req.file.originalname.replace(/\.(.*)/g, '');
    if (req.file.path.indexOf('.sql') !== -1 || req.file.path.indexOf('.pgsql') !== -1) {
      child = exec(`mongodump -d ${name} -o uploads/${req.cookies.ssid}/`, function(error, stdout, stderr) {
        next();
      })
    } else {
      child = exec(`sudo -u postgres pg_dump ${req.body.database_name} > uploads/${req.cookies.ssid}/${req.body.database_name}.sql`, function(error, stdout, stderr) {
        next();
      })
    }
  }

}

// mongodump -d booktown -o convert
// mongoimport --db states --collection locals --drop --file sample.json
// sudo -u postgres createdb booktown && sudo -u postgres psql booktown < ~/Documents/SQL-Power/uploads/56ce57e892e19adf592c2d05/booktown.sql
