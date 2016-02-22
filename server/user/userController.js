var User = require('./userModel');
var path = require('path');
// var bcrypt = require('bcrypt');
var client = path.join(__dirname, '..', '..', 'client');

//test user
var test = {
  username: 'an',
  password: 'test'
};

//store user name and password's input field in object
var userController = {};

//user will create profile in signup and successfully store to DB if username is not taken
userController.createUser = function(req, res,next){
  //if user tries to create an account with improper input fields, user will be redirected to signup
  if(!req.body.username || !req.body.password){
    res.sendFile(path.join(__dirname + './../../client/signup.html'), {error: "Must include username and password"});
  }
  //save username and password into database section

  var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // newUser.save(function(err, result) {
    //   if (err) return res.render(path.join(client, 'signup'), {error: "Username is taken"});
    //   res.redirect('/permission');
    // });

};

//user will be verified upon attempted login
userController.verify = function(req,res,next){
  // if input fields are undefined, do nothing
  if(!req.body.username || !req.body.password){
    res.sendFile(path.join(__dirname + './../../client/signup.html'), {error: "Must include username and password"});
  }

  if(req.body.username === test.username && req.body.password===test.password){

  }
  else{
    res.redirect('/signup');
  }
};



module.exports = userController;
