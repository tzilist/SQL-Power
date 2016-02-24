var React = require('react');


var TableInput = React.createClass({


  // RENDER STRING FOR DOM////////////////////////////////////
  // NOTE : It looks like this will make the string for the table????
  // /////////////////////////////////////////////
  render: function () {

    // GET DOM INPUTS////////////////////////////////////
    // NOTE : This loop will grab the state and add a ';' after each value;
    // /////////////////////////////////////////////

    // var semicolons = [];
    // for(var i = 0; i < this.props.state.string.length; i++){
    //   if (this.props.state.string[i] === ';'){
    //     semicolons.push(i+1)
    //     console.log(this.props.state.string);
    //   }
    // }

    // SEQUIAL TEXT SCHEMA////////////////////////////////////
    // NOTE : Assigns the state to a variable then adds them to a schema
    // definition?
    // /////////////////////////////////////////////
    // var requiringSequelize = this.props.state.string.substring(0,semicolons[0])
    // var newInstanceOfSequelize = this.props.state.string.substring(semicolons[0], semicolons[1])
    // var object = this.props.state.string.substring(semicolons[1], semicolons[2])
    // var objectHoldingFunc = this.props.state.string.substring(semicolons[2], semicolons[3])
    // var schema = this.props.state.string.substring(semicolons[3], semicolons[4])
    // console.log('the semicolons arr', semicolons)


    // CONDITIONAL FOR SOMTHING////////////////////////////////////
    // NOTE : I'm not sure what edge case this is trying to cover.
    // /////////////////////////////////////////////
    // if(this.props.state.string!=='')
    //   return (
    //     <div>
    //       {requiringSequelize}
    //       <br/>
    //       {newInstanceOfSequelize}
    //       <br/>
    //       {object}
    //       <br/>
    //       {objectHoldingFunc}
    //       <br/>
    //       {schema}
    //     </div>
    //   )

    // if (this.props.state.columns !== 0) {
    // console.log('where is this?',this.props.state.string);
    //creating an array of where all the semicolons are
    // var semicolons = [];
    // for(var i = 0; i < this.props.state.string.length; i++){
    //   if (this.props.state.string[i] === ';'){
    //     semicolons.push(i+1)
    //   }
    // }
    //
    // var requiringSequelize = this.props.state.string.substring(0,semicolons[0])
    // var newInstanceOfSequelize = this.props.state.string.substring(semicolons[0], semicolons[1])
    // var object = this.props.state.string.substring(semicolons[1], semicolons[2])
    // var objectHoldingFunc = this.props.state.string.substring(semicolons[2], semicolons[3])
    // var schema = this.props.state.string.substring(semicolons[3], semicolons[4])
    // console.log('the semicolons arr', semicolons)
    //
    // if(this.props.state.string!=='')
    //   return (
    //     <div>
    //       {requiringSequelize}
    //       <br/>
    //       {newInstanceOfSequelize}
    //       <br/>
    //       {object}
    //       <br/>
    //       {objectHoldingFunc}
    //       <br/>
    //       {schema}
    //     </div>
    //   )

    // if (this.props.state.columns !== 0) {
    //
    //   return (
    //     <form id='createSchema' onSubmit={this.props.create}>
    //       {newForm}
    //       <button type='submit'>Create Table</button>
    //     </form>
    //   )
    // }
    // else {
      var newForm = [];
      for (var i = 0; i < this.props.state.columns; i++) {
        newForm.push(
          <div key={i} className='colnamesdiv'>
            <input id={'colnames'+i} placeholder='Column Name'></input>
            <select id={'coltype'+i}>
              <option>STRING</option>
              <option>NUMBER</option>
              <option>CHAR</option>
              <option>TEXT</option>
              <option>INTERGER</option>
              <option>DECIMAL</option>
              <option>DATE</option>
              <option>JSON</option>
            </select>
            <br/>
          </div>

        );
      }


      return (
        <div>
          <form id='makeCol' onSubmit={this.props.makeTableSchema}>
            <input className='TableInput' placeholder='Table Name'></input><br/>
            <input id='UsernameOfDatabase' placeholder='Username'></input><br/>
            <input id='PasswordOfDatabase' placeholder='Password'></input><br/>
            <input className='numberOfColumns' placeholder='Number of Columns'></input><br/>
            <button type='submit' onClick={this.props.makeTableSchema}>Create Table Schema!</button>
          </form>
          <button type='submit' onClick={this.props.makeCol}>Add column</button>
          <button type='submit' onClick={this.props.rmCol}>Remove column</button>
          {newForm}
        </div>
      )
    }
  // }
});

module.exports = TableInput;
