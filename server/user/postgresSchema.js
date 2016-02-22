
module.exports = function(req,res){
  console.log('table',req.body.table)
  console.log('un',req.body.un)
  console.log('pw',req.body.pw)
  console.log('colNum1',req.body.colNum)
  console.log('colnames[0]',req.body.colnames[0])
  console.log('coltypes[0]',req.body.colTypes[0])

var schemaTopHalf = 'var Sequelize = require ("sequelize"); var sequelize = new Sequelize(' + req.body.table + ',' + req.body.un + ',' + req.body.pw + ', { host: "localhost", dialect: "postgres"}); var defineCreate = {}; defineCreate.schema = schema;  function schema() {'
    for (var i = 0; i < req.body.colNum; i++ ){
      var column = req.body.colnames[i] + ':{ type: Sequelize.' + req.body.colTypes[i] + '}'
      if (i !== req.body.colNum - 1){
        column+=','
      }
      schemaTopHalf += column
    }
    schemaTopHalf += '}';
    res.send({string: schemaTopHalf});
}
