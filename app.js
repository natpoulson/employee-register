const Record = require('./lib/sql.js');

console.log(Record.view("my_test_table",
    [
        "first_name", 
        "last_name", 
        "salary"
    ],
    {
       "first_name":"James",
        "last_name":"Corden"
    }
));