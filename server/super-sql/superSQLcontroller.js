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

        //templating for the top require sequelize and Constructor
        const _RequireSQL  = `var Sequelize = require('sequelize')`;
        const _SQLdataBase = `var sequelize = new Sequelize ( ${db.database.url}, ${db.database.username}, ${db.database.password})`;

        //SQL MODEL
        const _instanceData =  {};
        dbData.forEach( (value) => {
                                      for(var key in dbData){
                                          for (var item in value) {
                                              console.log('key:', item);
                                              console.log('value:', value[item]);
                                              _instanceData[item] = value[item];
                                            }
                                          }
                                   });

        let _SQLinstance  = `var ${db.database.table} = sequelize.define(${db.database.table}, ${_instanceData})`;
        console.log('_instanceDATA: ', _instanceData);
        console.log(db);

    }

 // console.log(JSON.stringify(dataChunk, null, '\t'));

 createSQLModel(dataChunk);


module.exports = superSQLController;
