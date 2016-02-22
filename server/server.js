var express = require ('express');
var fs = require ('fs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var schema = require('./user/postgresSchema')

app.use(express.static(path.join(__dirname, './../client')));

// order of process for user
// userController --> cookieController --> sessionController --> features
var userController = require('./user/userController');
var cookieController = require('./cookie/cookieController');
var sessionController = require('./session/sessionController');

// initial web-page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + './../client/index.html'));
});

//adds body to the request which will store username input and password input
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Signup Post page
app.get('/signup', userController.createUser);

//Default Login Post Page
app.post('/login', function(req, res){
  cookieController.setSSIDCookie(req,res);
  sessionController.isLoggedIn(req,res);
  userController.verify(req,res);
});

//Authorized user page
app.get('/permission', function(req, res){
  //add session and cooker checker before sending to app
  res.sendFile(path.join(__dirname + './../client/loggedin.html'));
});

// user logs out and has their session/cookies removed
app.get('/logout',function(req,res){
  //add session remover middleware
  res.sendFile(path.join(__dirname + './../client/index.html'));
});

app.post('/loggedin',function(req,res){
  console.log(req.body)
  schema(req,res)
  }
)
app.listen(3000, function(){
  console.log('Listening on port 3000!');
});
