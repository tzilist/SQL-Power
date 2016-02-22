var cookieController = {};
// var jwt = require('jsonwebtoken');

var cert = 'key';

cookieController.setSSIDCookie = function(req,res,id){
  // jwt.sign({ id: id}, cert, {algorithm: 'HS256'}, function(token){
    res.cookie('ssid', 1, {httpOnly: true});
  // });
};

module.exports = cookieController;
