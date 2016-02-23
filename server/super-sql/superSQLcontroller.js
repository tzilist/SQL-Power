"use strict"
const express = require('express');

const superSQLController = {};

//Our json data object
let dataChunk = { schema:{
                          "database": {
                                      "type"     : 'sql',
                                      "username" : 'name_value',
                                      "password" : 'db_password',
                                      "url"      : 'localhost://3000'
                                      },

                              "data": [{
                                        "table": 'table_name',
                                        "col-docs" : [{
                                                      "column Name" : "value",
                                                      "column Name" : "value",
                                                      "column Name" : "value"
                                                      }]
                                      }]
                            }

                };


 // console.log(JSON.stringify(dataChunk, null, '\t'));


module.exports = {

    createSQLModel: function (req, res, next){
        //templating for the top require sequelize and Constructor
        // let db = req.body.schema;  //production variable
        let db    = dataChunk.schema;

        let _RequireSQL  = `var Sequelize = require('sequelize')`;
        let _SQLdataBase = `var sequelize = new Sequelize ( ${url}, ${dbUsername}, ${password})`;

        let _instanceData =  {};

        db.data.forEach( (value) => {
                                      for(var key in db.data)
                                        _instanceData[key] = key;
                                        _instanceData[key] = db.data.key;
                                        console.log(key);
                                   });

        let _SQLinstance  = `var ${tableName} = sequelize.define(${tableName}, ${_instanceData})`;

        console.log('instance: ' ,instance);
        console.log('_instanceDATA: ', _instanceData);

        return _SQLinstance;

    }

};
