"use strict"
const express = require('express');

const superSQLController = {};
superSQLController.createSQLModel = createSQLModel;
//Our json data object

    const dataChunk = {
      "schema":{
      "database": {
        "type"     : 'sql',
        "username" : 'name_value',
        "password" : 'db_password',
        "url"      : 'localhost://3000'
      },

      "data": {
        "table": 'table_name',
        "colORdocs" : [{
          "column Name" : "value",
          "column Name" : "value",
          "column Name" : "value"
          }]
        }
      }

    };

    function createSQLModel(dataChunk) {
        //templating for the top require sequelize and Constructor
        // const db = req.body.schema;  //production variable
        const db    = dataChunk.schema;
        const dbData = dataChunk.schema.data.colORdocs;

        // console.log('data:', dataChunk.schema.data.colORdocs);

        const _RequireSQL  = `var Sequelize = require('sequelize')`;
        const _SQLdataBase = `var sequelize = new Sequelize ( ${db.database.url}, ${db.database.username}, ${db.database.password})`;

        const _instanceData =  {};
        dbData.forEach( (value) => {
                                      for(var key in db.data)
                                        _instanceData[key] = db.data.key;
                                        console.log(_instanceData);
                                      // console.log(value);
                                   });

        let _SQLinstance  = `var ${db.database.table} = sequelize.define(${db.database.table}, ${_instanceData})`;

        // console.log('Require IN: ' , _RequireSQL);
        // console.log('Constructor: ' , _SQLdataBase);
        // console.log('Model: ' , _SQLinstance);
        console.log('_instanceDATA: ', _instanceData);
        console.log(db);
        // return _SQLinstance;

    }

 // console.log(JSON.stringify(dataChunk, null, '\t'));

 createSQLModel(dataChunk);


module.exports = superSQLController;
