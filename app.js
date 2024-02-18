const { Column, Record } = require('./lib/sql.js');

const columns = [new Column('name'), new Column('salary', true)];
const data = [{name:"Data Analyst", salary:"1000.20"}, {name:"Systems Administrator", salary:"1420.69"}];

Record.add("roles", columns, data);