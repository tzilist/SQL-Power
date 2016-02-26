const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./user/userController');
const upload = require('./user/uploadController');
const cookieController = require('./cookie/cookieController');
const sessionController = require('./session/sessionController');
const mongoToSQL = require('./super-sql/mongoToSQLcontroller');
const SQLtoMongo = require('./super-sql/SQLtoMongoController');
const schema = require('./user/postgresSchema');
const mongoose = require('mongoose');
const multer = require('multer');
const EasyZip = require('easy-zip').EasyZip;


//connect to DB
const mongoURI = 'mongodb://localhost/databasepower';
mongoose.connect(mongoURI);

app.use(cookieParser());

// order of process for user
// userController --> cookieController --> sessionController --> features


// initial web-page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + './../client/index.html'));
});

//adds body to the request which will store username input and password input
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/signup', userController.createUser);
app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, './../client/signup.html'));
});



app.post('/login', userController.verifyUser);

app.use('/logout', cookieParser());
app.get('/logout', function(req, res) {
  sessionController.logout(req.cookies.ssid);
  res.redirect('/');
});


app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/input.html'));
});

app.post('/upload', upload.mkdir,
  multer({
    storage: multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, `uploads/${req.cookies.ssid}`);
      },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      }
    })
  }).single('database'),
  upload.import,
  upload.export,
  (req, res) => {
    if (req.file.path.indexOf('.sql') !== -1 || req.file.path.indexOf('.pgsql') !== -1) {
    res.redirect(`/download?name=${req.file.originalname.replace(/\.(.*)/g, '')}&type=mongo`);
  } else {
    res.redirect(`/download?name=${req.body.database_name}.sql&type=sql`);
  }
  });

app.get('/download', (req, res) => {
  if(req.query.type === 'mongo') {
    console.log(path.join(__dirname, `./../uploads/${req.cookies.ssid}/${req.query.name})`));
    var zip = new EasyZip();
    zip.zipFolder(path.join(__dirname, `./../uploads/${req.cookies.ssid}/${req.query.name}`), (err) => {
      if (err) console.log(err);
      zip.writeToResponse(res, 'download');
    });
  } else {
    console.log(path.join(__dirname, `./../uploads/${req.cookies.ssid}/${req.query.name}`));
    res.sendFile(path.join(__dirname, `./../uploads/${req.cookies.ssid}/${req.query.name}`));
  }
});


app.get('/start', sessionController.isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname, '../client/loggedin.html'));
});

app.use(express.static(path.join(__dirname, './../client')));

app.post('/loggedin', function(req, res) {
  console.log(req.body);
  schema(req, res);
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
