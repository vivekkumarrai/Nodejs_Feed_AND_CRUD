require('dotenv').config(); 
var mysql = require('mysql');

var dbConn = mysql.createConnection({
      host: process.env.A_HOST,
      user: process.env.B_USER,
      password: process.env.C_PASSWORD,
      database: process.env.D_DATABASE
});

dbConn.connect(function(err){
    if(!err) {
        console.log('DATABAE IS CONNECTED');
    }
    else{
        console.log('ERROR WHILE CONNECTING DATABASE');
    }
});

module.exports = dbConn;