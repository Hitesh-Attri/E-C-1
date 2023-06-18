// const sql = require('mssql/msnodesqlv8');

// if(process.env.NODE_ENV =! "production"){
//     require("dotenv").config();
// }
// var config = {
//     server: process.env.SERVER,
//     database : process.env.DATABASE,
//     driver : process.env.DRIVER, 
//     options : {
//         trustedConnection : true
//     }
// };


// module.exports = sql.connect(config,(err)=>{
//     if(err){
//         console.log(err,"< err in sql sb connection")
//     }else{
//         console.log("Database connected");
//     }
// })

const sql = require('mssql');

var config = {
    port:1433,
    database : "testDB",
    server : "BUNTY\\SQLEXPRESS",
    driver : "msnodesqlv8",
    options : {
        // encrypt : false,

        // trustServerCertificate: true,
        trustedConnection : true
    }
};

sql.connect(config,(err)=>{
    if(err) console.log(err);
    else {
        console.log('sql database connected');
        let rqst = new sql.Request();
        rqst.query('select * from testTable_1',(err,result)=>{
            if(err) console.log(err);
            else console.log(result);
        })
    }
})