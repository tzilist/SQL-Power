var express = require('express');

var superSQLController = {};

//Our json data object
var dataChunk = { schema:[{
                          "database": {
                                      "username": 'name_value',
                                      "password": 'db_password'
                                      },

                              "data": [{
                                        "table": 'table_name',
                                        "col-docs" : [{
                                                      "column Name" : "value",
                                                      "column Name" : "value",
                                                      "column Name" : "value"
                                                      }]
                                      }]
                            }]

                };


 // console.log(JSON.stringify(dataChunk, null, '\t'));





module.exports = {

    parseData: function(req,res,next){


    },

    // createSQLModel: function (req, res, next){
    //     let instance = `new Sequelize( ${database}, ${dbUsername}, ${password}` );
    //
    // }

};
