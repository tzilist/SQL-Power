const express = require ('express');
const fs = require ('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./user/userController');
const cookieController = require('./cookie/cookieController');
const sessionController = require('./session/sessionController');
const mongoToSQL = require('./super-sql/mongoToSQLcontroller');
const schema = require('./user/postgresSchema');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
  }
});

//connect to DB
const mongoURI = 'mongodb://localhost/databasepower';
mongoose.connect(mongoURI);

app.use(cookieParser());

// order of process for user
// userController --> cookieController --> sessionController --> features


// initial web-page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + './../client/index.html'));
});

//adds body to the request which will store username input and password input
app.use(bodyParser.urlencoded({ extended: true }));
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
app.post('/upload', multer({storage: storage}).single('database'), (req, res) => {
  res.status(204).end();
});


app.get('/start', sessionController.isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname, '../client/loggedin.html'));
});

app.get('/test', (req, res) => {
  console.log('mongotosql');
  res.status(200).end();
});

app.use(express.static(path.join(__dirname, './../client')));

app.post('/loggedin',function(req,res){
  console.log(req.body);
  schema(req,res);
  }
);

app.listen(3000, function(){
  console.log('Listening on port 3000!');
});
