var React = require('react');
var ReactDOM = require('react-dom');
var TableInput = require('./TableInput');
var $ = require('jquery');

var App = React.createClass({

  getInitialState: function() {
    return {columns: 0, sqlSchema: [], table: '', un: '', pw: '', string: ''}
  },

  // createTable: function(e) {
  //   e.preventDefault();
  //   var cols = [];
  //   var types = [];
  //   for(var i = 0; i < this.state.columns; i++) {
  //     var hold1 = '#colnames' + i.toString();
  //     var hold2 = '#coltype' + i.toString();
  //     cols.push($(hold1).val());
  //     types.push($(hold2).val());
  //   }
  //   var info = {
  //     table: this.state.table,
  //     un: this.state.un,
  //     pw: this.state.pw,
  //     colNum: this.state.columns,
  //     colnames: cols,
  //     colTypes: types
  //   }
  //   info = JSON.stringify(info);
  //   $.ajax({
  //     type:'POST',
  //     url: '/loggedin',
  //     data: info,
  //     contentType: 'application/json; charset=UTF-8',
  //     dataType: 'json',
  //     success: function(data) {
  //       console.log('data: ', data.string)
  //       // App.string = data;
  //       this.setState({columns: this.state.columns, table: this.state.table, un:this.state.un, pw:this.state.pw, string: data.string})
  //     }.bind(this)
  //   })
  //   console.log(this.state);
  // },
  //
  // string: '',

  // makeTableSchema: function(e) {
  //   e.preventDefault();
  //
  //
  //   this.setState({columns: $('#numberOfColumns').val(), table: $('#TableInput').val(), un: $('#UsernameOfDatabase').val(), pw: $('#PasswordOfDatabase').val()});
  //   this.sendInfoToForm
  // },

  makeTableSchema: function(e) {
    e.preventDefault();

    this.state.sqlSchema = [];
    var currentState = this.state;
    for (var i = 0; i < this.state.columns; i++) {
      var name = document.getElementById('colnames' + i).value;
      var type = document.getElementById('coltype' + i).value;
      console.log(name);
      console.log(type);
      if (name === '') return alert('Add name to column ' + (i + 1));
      currentState.sqlSchema.push('Name:' + name + 'Type: ' + type);
    }
    console.log('currentState.sqlSchema: ', currentState.sqlSchema);
    this.state.columns = 0;
    this.setState(currentState);
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

  render: function () {
    // var tableArr = [];
    // this.state.sqlSchema.forEach(val => {
    //   tableArr.push(val);
    // })

    return (
      <div id='App' >
        <TableInput rmCol={this.rmCol} makeCol={this.makeCol} makeTableSchema={this.makeTableSchema} state={this.state} string={this.string} create={this.createTable}/>
     </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
