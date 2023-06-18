const mysql = require('mysql');

const db = mysql.createConnection({
    host :"localhost",
    user : "root",
    password: "",
    database: "testDB"
})

// online php my admin
// const db = mysql.createConnection({
//     host :"sql12.freemysqlhosting.net",
//     user : "sql12612019",
//     password: "dkSRg3pdAw",
//     database: "sql12612019"
// })

db.connect((err)=>{
    if(err) console.log(err)
    else{
        console.log("MySql connected");
    }
})

module.exports = db;
