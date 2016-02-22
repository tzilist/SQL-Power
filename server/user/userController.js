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
    res.sendFile(path.join(__dirname + './../../client/index.html'), {error: "Must include username and password"});
  }

  //save username and password into database section
  var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err, result) {
      if (err) res.sendFile(path.join(__dirname + './../../client/index.html'));
    });

};

//user will be verified upon attempted login
userController.verify = function(req,res,next){
  // if input fields are undefined, do nothing
  if(!req.body.username || !req.body.password){
    return res.sendFile(path.join(__dirname + './../../client/index.html'), {error: "Must include username and password"});
  }


  User.findOne({username: req.body.username}, function(err, result){
    if(err || !result) return res.send('failed');

    result.comparePassword(req.body.password, function(err, check){
      if(!check) res.send('failed password');
      res.redirect('/permission');
    });
  });


};



module.exports = userController;
