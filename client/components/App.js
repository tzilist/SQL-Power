var React = require('react');
var ReactDOM = require('react-dom');
var TableInput = require('./TableInput');
var $ = require('jquery');

var App = React.createClass({

  getInitialState: function() {
    return {columns: 0, table: '', un: '', pw: '', string: ''}
  },

  createTable: function(e) {
    e.preventDefault();
    var cols = [];
    var types = [];
    for(var i = 0; i < this.state.columns; i++) {
      var hold1 = '#colnames' + i.toString();
      var hold2 = '#coltype' + i.toString();
      cols.push($(hold1).val());
      types.push($(hold2).val());
    }
    var info = {
      table: this.state.table,
      un: this.state.un,
      pw: this.state.pw,
      colNum: this.state.columns,
      colnames: cols,
      colTypes: types
    }
    info = JSON.stringify(info);
    $.ajax({
      type:'POST',
      url: '/loggedin',
      data: info,
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      success: function(data) {
        console.log(data.string)
        // App.string = data;
        this.setState({columns: this.state.columns, table: this.state.table, un:this.state.un, pw:this.state.pw, string: data.string})
      }.bind(this)
    })
    console.log(this.state)
    alert('hi')

  },

  string: '',

  thing: function(e) {
    e.preventDefault();
    this.setState({columns: $('#numberOfColumns').val(), table: $('#TableInput').val(), un: $('#UsernameOfDatabase').val(), pw: $('#PasswordOfDatabase').val()});
    this.sendInfoToForm
  },

  render: function () {

    return (
      <div id='App' >
        <TableInput makeForm={this.thing} state={this.state} string={this.string} create={this.createTable}/>
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
