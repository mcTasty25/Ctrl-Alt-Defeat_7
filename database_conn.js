const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "*******",
    password: "********",
    database: "hexgenius"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "select * from  impcontacts where type = 'Ambulance';";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});