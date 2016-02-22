var React = require('react');


var TableInput = React.createClass({
  render: function () {
    console.log('where is this?',this.props.state.string);
    //creating an array of where all the semicolons are
    var semicolons = [];
    for(var i = 0; i < this.props.state.string.length; i++){
      if (this.props.state.string[i] === ';'){
        semicolons.push(i+1)
      }
    }
    var requiringSequelize = this.props.state.string.substring(0,semicolons[0])
    var newInstanceOfSequelize = this.props.state.string.substring(semicolons[0], semicolons[1])
    
    var object = this.props.state.string.substring(semicolons[1], semicolons[2])
    var objectHoldingFunc = this.props.state.string.substring(semicolons[2], semicolons[3])
    var schema = this.props.state.string.substring(semicolons[3], semicolons[4])
    console.log('the semicolons arr', semicolons)
    if(this.props.state.string!=='')
      return (
        <div>
          {requiringSequelize}
          <br/>
          {newInstanceOfSequelize}
          <br/>
          {object}
          <br/>
          {objectHoldingFunc}
          <br/>
          {schema}
        </div>
      )

    if(this.props.state.columns !== 0) {
      var newForm = [];
      for(var i = 0; i < this.props.state.columns; i++) {
        newForm.push(
          <div key={i} className='colnamesdiv'>
            <input id={'colnames'+i} placeholder='Column Name'></input>
            <select id={'coltype'+i}>
              <option>string</option>
              <option>number</option>
            </select>
            <br/>
          </div>

        );
      }
      return (
        <form id='createSchema' onSubmit={this.props.create}>
          {newForm}
          <button type='submit'>Create Table</button>
        </form>
      )
    } else {
      return (
        <form id='makeNewForm' onSubmit={this.props.makeForm}>
          <input id='TableInput' placeholder='Table Name'></input><br/>
          <input id='UsernameOfDatabase' placeholder='UsernameOfDatabase'></input><br/>
          <input id='PasswordOfDatabase' placeholder='PasswordOfDatabase'></input><br/>
          <select id='numberOfColumns'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select><br/>
          <button type='submit'>Make columns</button>
        </form>
      )
    }
  }
});

module.exports = TableInput;
