// MONGOOSE MODEL/SCHEMA////////////////////////////////////
// NOTE : Example schema from mongoose.
// /////////////////////////////////////////////

  //Require in Mongoose
  var mongoose = require('mongoose');

  //Connect to url
  mongoose.connect('mongodb://localhost/test');

  //Create a model | constructor
  var Cat = mongoose.model('Cat', { name: String });

  //Create an instance of that model
  var kitty = new Cat({ name: 'Zildjian' });

  //Save instance to the database
  kitty.save(function (err) {
    if (err) // ...
    console.log('meow');
  });


  // MODEL VIA TEMPLATE LITERAL/////////////////////////
  // NOTE : The goal is to translate the above methods into a function that uses a template literal to create models dynamically
  // /////////////////////////////////////////////
