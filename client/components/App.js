var React = require('react');
var ReactDOM = require('react-dom');
var TableInput = require('./TableInput');

var App = React.createClass({

  getInitialState: function() {

    var state = {
      scriptCount: 0,
      allScripts: [],
      columns: 0,
      dataChunk: {
        allScripts: [],
        schema: {
          database: {
            type: 'sql'
            // username: 'Sequelize.String',
            // password: 'Sequelize.String',
            // url : 'localhost://3000'
          },
          data: {}
        }
      }
    };

    return state;
  },

  rmTable: function(e) {
    e.preventDefault();
    var currentState = this.state
    console.log('this.state.allScripts: ', this.state.allScripts);

    for (var key in currentState.dataChunk.schema.data) {
      if (key === document.getElementById('tableName').value) {
        delete currentState.dataChunk.schema.data[key];
      }
    }
    document.getElementById('usernameOfDb').value = '';
    document.getElementById('passwordOfDb').value = '';
    document.getElementById('tableName').value = '';
    document.getElementById('URL').value = '';
    // var removeClass = document.getElementsByClassName('script');
    // removeClass.remove();
    currentState.dataChunk.allScripts = currentState.dataChunk.allScripts.slice(0, currentState.dataChunk.allScripts.length -3)
    document.getElementsByClassName('script')[0].remove();
    this.setState(currentState);
    console.log('currentstatdata: ', currentState.dataChunk.schema.data);
  },

  makeTableSchema: function(e) {

    e.preventDefault();
    if (document.getElementById('tableName').value === '' || document.getElementById('usernameOfDb').value === '' || document.getElementById('passwordOfDb').value === '' || document.getElementById('URL').value === '') return alert('Missing inputs!');
    var currentState = this.state;
    currentState.dataChunk.currentTableName = document.getElementById('tableName').value;
    currentState.dataChunk.schema.data[(document.getElementById('tableName').value)] = [];

    for (var i = 0; i < this.state.columns; i++) {
      var col = {};
      col.name = document.getElementById('colnames' + i).value;
      col.type = 'Sequelize.' + document.getElementById('coltype' + i).value;
      // console.log(name);
      // console.log(type);
      // if (col.tableName === '') return alert('Add table name');
      if (col.name === '') return alert('Add name to column ' + (i + 1));
      currentState.dataChunk.schema.data[(document.getElementById('tableName').value)].push(col);
    }
    // currentState.dataChunk.schema.data.table = document.getElementById('tableName').value;
    currentState.dataChunk.schema.database.url = document.getElementById('URL').value;
    currentState.dataChunk.schema.database.username = document.getElementById('usernameOfDb').value;
    currentState.dataChunk.schema.database.password = document.getElementById('passwordOfDb').value;
    // col.name = name;
    // col.type = type
    // console.log('currentState.sqlSchema: ', currentState.sqlSchema);
    console.log('currentState.dataChunk.schema.data: ', currentState.dataChunk.schema.data);
    console.log('currentState ', currentState);
    this.state.columns = 0;
    document.getElementById('usernameOfDb').value = '';
    document.getElementById('passwordOfDb').value = '';
    document.getElementById('tableName').value = '';
    document.getElementById('URL').value = '';
    this.createSQLModel(currentState.dataChunk);
    this.setState(currentState);
    console.log('test: ', this.state.dataChunk.currentScript);
  },

  makeCol: function() {
    // console.log('makeColstate: ', this.state);
    var currentState = this.state;
    currentState.columns++;
    this.setState(currentState);
  },

  rmCol: function() {
    if (this.state.columns !== 0) {
      var currentState = this.state;
      currentState.columns--;
      this.setState(currentState);
    }
  },

  createSQLModel: function(dataChunk) {

    // const db = req.body.schema;  //production variable
    dataChunk.allScripts = [];
    for (var tableName in dataChunk.schema.data) {
      let db    = dataChunk.schema;
      let dbData = dataChunk.schema.data[tableName];
      let _RequireSQL  =` var Sequelize = require('sequelize');\n`;
      let _SQLdataBase =`var sequelize = new Sequelize(\'${db.database.url}\', \'${db.database.username}\',\'${db.database.password}\', {\n
        host: \'localhost\',\n
        dialect: \'postgres\'\n
      });\n`;
      let _instanceData = {};

      for (var i = 0; i < dbData.length; i++) {
        _instanceData[dbData[i].name] = dbData[i].type;
      };
      let _SQLinstance  =`var ${dataChunk.currentTableName} = sequelize.define(\'${dataChunk.currentTableName}\',\n ${JSON.stringify(_instanceData, null, '\t').replace(/['"]+/g, '')});\n `;
      var SQLscript = [_RequireSQL, _SQLdataBase, _SQLinstance];
      dataChunk.allScripts.push(SQLscript);
      // console.log(_RequireSQL, _SQLdataBase, _SQLinstance);
      // console.log('dataChunk.schema.data[tableName]: ', JSON.stringify(dataChunk.schema.data[tableName]));
    }
    console.log('dataChunk.allScripts: ', dataChunk.allScripts);
      // const db    = dataChunk.schema;
      // // const dbData = dataChunk.schema.data[dataChunk.currentTableName];
      //
      // //Require SQL
      // const _RequireSQL  =` var Sequelize = require('sequelize');\n`;
      //
      // //Create instance of Sequelize
      // const _SQLdataBase =`var sequelize = new Sequelize(\'${db.database.url}\', \'${db.database.username}\',\'${db.database.password}\', {\n
      //   host: \'localhost\',\n
      //   dialect: \'postgres\'\n
      // });\n`;
      //
      // //SQL MODEL Object
      // const _instanceData = {};
      //
      // for (var i = 0; i < dbData.length; i++) {
      //   _instanceData[dbData[i].name] = dbData[i].type;
      // };
      //
      // //Create Model
      // // console.log(_instanceData);
      // let _SQLinstance  =`var ${dataChunk.currentTableName} = sequelize.define(\'${dataChunk.currentTableName}\',\n ${JSON.stringify(_instanceData, null, '\t').replace(/['"]+/g, '')});\n `;
      // var SQLscript = [_RequireSQL, _SQLdataBase, _SQLinstance];
      // dataChunk.currentScript = SQLscript;
      // console.log(_RequireSQL, _SQLdataBase, _SQLinstance);

  },

  render: function () {
    // var tableArr = [];
    // this.state.sqlSchema.forEach(val => {
    //   tableArr.push(val);
    // })
    // var script = [];
    // if (this.state.dataChunk.currentScript) {
    //   for (var i = 0; i < this.state.dataChunk.currentScript.length; i++) {
    //     script.push(<p>{this.state.dataChunk.currentScript[i]}</p>);
    //   }
    //   this.state.scriptCount++;
    //   this.state.allScripts.push(<div className='script' id={'script' + this.state.scriptCount}>{script}<button onClick={}>Remove Table Schema</button></div>);
    // }
    // this.state.dataChunk.currentScript = undefined;

    this.state.allScripts = [];
    for (var i = 0; i < this.state.dataChunk.allScripts.length; i ++) {
      var script = [];
      for (var j = 0; j < this.state.dataChunk.allScripts[i].length; j++) {
        script.push(<p>{this.state.dataChunk.allScripts[i][j]}</p>);
      }
      this.state.allScripts.push(<div className='script'>{script}</div>);
    }

  console.log('SCRIPTS: ', script);

    return (
      <div id='App' >
        <TableInput rmCol={this.rmCol} makeCol={this.makeCol} makeTableSchema={this.makeTableSchema} rmTableSchema={this.rmTable} state={this.state} />
        {this.state.allScripts}
     </div>

    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
