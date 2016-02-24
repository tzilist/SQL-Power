const User = require('./userModel');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieController = require('./../cookie/cookieController.js');
const sessionController = require('./../session/sessionController.js');
const fs = require('fs');
const userController = {};

userController.createUser = function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.redirect('/signup');
  }

  User.findOne({username: req.body.username}, (err, result) => {
    if(result) return res.redirect('/signup');

    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err, result) {
      User.findOne({username: req.body.username}, (err, result) => {
        cookieController.setSSIDCookie(res, result._id);
        res.redirect('/start');
      });
    });

  });
};

userController.verifyUser = function(req, res) {
  // no username or password provided
  if (!req.body.username || !req.body.password) {
    return res.redirect('/signup');
  }
  // username/password is incorrect
  User.findOne({
    username: req.body.username
  }, function(err, result) {
    console.log(result);
    // username not found
    if (err || !result) return res.redirect('/signup');

    result.comparePassword(req.body.password, function(err, pswdCheck) {
      if (!pswdCheck) return res.redirect('/signup');
      cookieController.setSSIDCookie(res, result._id);
      res.redirect('/start');
    });
  });
};


module.exports = userController;
