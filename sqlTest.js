const db = require('./sqlConnection');

let query = "select * from users";
let query2 = `update testTable_1 set name = "B" where name = "A"`;
let query3 = `insert into users values(null,"thor", "thor@gmail.com", "thor1", true, 1102);`;

let query4 = `select * from users where username = ?;`;
db.query(query4,["1"],(err,result)=>{
    if(err) console.log(err)
    else {
        console.log(result,typeof result);
    }
})

let username = "bander";
let email = "bander@gmail.com";
let password = "bander";
let isVerified = true;
let mailToken = 1120234;

let query5 = `insert into users values(null,?, ?, ?, ?, ?);`;

/// table => | null | username | email | password | isverified | mailtoken |
// db.query(query5,[username,email,password,isVerified,mailToken,],(err,result)=>{
//     if(err) console.log(err)
//     else {
//         // console.log(result,typeof result);
//     }
// })





// sign up .js
// phle check kro if username exists in db or not
// agr select * from tablename where username = ?username ata hai to useraleady exists in table else insert in table 