var sessionController = {};

sessionController.isLoggedIn = function(req, res, next){

    res.redirect('/permission');


};

module.exports = sessionController;
