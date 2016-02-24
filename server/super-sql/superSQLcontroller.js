"use strict"
const express = require('express');

const superSQLController = {};
superSQLController.createSQLModel = createSQLModel;
//Our json data object

    const dataChunk = {
      "schema":{
      "database": {
        "type"     : 'sql',
        "username" : 'Sequelize.String',
        "password" : 'Sequelize.String',
        "url"      : 'localhost://3000'
      },

      "data": {
        "table": 'table_name',
        "colORdocs" : [{
          "username" : "johnCrackersmacker",
          "password" : "yabbadabbado",
          "url" : "www.super.com"
          }]
        }
      }

    };

    function createSQLModel(dataChunk) {

        // const db = req.body.schema;  //production variable
        const db    = dataChunk.schema;
        const dbData = dataChunk.schema.data.colORdocs;

        //Require SQL
        const _RequireSQL  = `var Sequelize = require('sequelize')`;
        //Create instance of Sequelize
        const _SQLdataBase = `var sequelize = new Sequelize ( ${db.database.url}, ${db.database.username}, ${db.database.password})`;

        //SQL MODEL Object
        const _instanceData =  {};

        //create Model Obj key: values
        dbData.forEach( (value) => {
                                      for(var key in dbData){
                                          for (var item in value) {
                                              console.log('key:', item);
                                              console.log('value:', value[item]);
                                              _instanceData[item] = value[item];
                                            }
                                          }
                                   });

        //Create Model
        let _SQLinstance  = `var ${db.database.table} = sequelize.define(${db.database.table}, ${_instanceData})`;
    }


    function createNoSQLModel(dataChunk) {

        // const db = req.body.schema;  //production variable
        const db    = dataChunk.schema;
        const dbData = dataChunk.schema.data.colORdocs;

        //Require SQL
        const _RequireMongoose  = `var mongoose = require('mongoose');`;
        //Create instance of Sequelize
        const _Mongooseconnect = `mongoose.connect( mongodb://${db.database.url} );`;

        //Mongoose MODEL Object
        const _instanceData =  {};

        //create Model Obj key: values
        dbData.forEach( (value) => {
                                      for(var key in dbData){
                                          for (var item in value) {
                                              console.log('key:', item);
                                              console.log('value:', value[item]);
                                              _instanceData[item] = value[item];
                                            }
                                          }
                                   });

        //Create Model
        // CREATE MONGOOSE MODEL////////////////////////////////////
        // NOTE : This is the mongoose model
        // Example:  var Cat = mongoose.model('Cat',{name: String};
        // /////////////////////////////////////////////
        let _Mongooseinstance  = `var ${dataChunk.data.table} = mongoose.model(${db.database.table}, ${_instanceData})`;

        console.log(_RequireMongoose);
        console.log(_Mongooseconnect);
        console.log(_Mongooseinstance);

    }

 // console.log(JSON.stringify(dataChunk, null, '\t'));

 createNoSQLModel(dataChunk);


module.exports = superSQLController;
