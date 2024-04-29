const mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
})

con.connect();

// const query = "insert into user(name,email,password)values('user','user@gmail.com','user')";
const query = "select * from user";

con.query(query,(error,result,index) => {
    if(error) throw error;
    // console.log("Data Insert");
    console.log(result);
})