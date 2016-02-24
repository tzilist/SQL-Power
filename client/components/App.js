var React = require('react');
var ReactDOM = require('react-dom');
var TableInput = require('./TableInput');
var $ = require('jquery');

var App = React.createClass({


  getInitialState: function() {
    return { columns: 0, table: '', un: '', pw: '', string: '' }
  },

  makeTableSchema: function(e) {
    e.preventDefault();
    // this.setState({columns: $('#numberOfColumns').val(), table: $('#TableInput').val(), un: $('#UsernameOfDatabase').val(), pw: $('#PasswordOfDatabase').val()});
    // this.sendInfoToForm
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
