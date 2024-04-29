const express = require('express');
const mysql = require('mysql');


const app = express();

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
})

con.connect();

app.set("view engine","ejs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/index.html');
})

app.get('/ejs',(req,res) => {
    const query = "select * from user";

    con.query(query,(error,result,index) => {
        if(error) throw error
        res.render('index',{result});
    })
})

// Delete 


app.get('/delete/:id',(req,res) => {

    const id = req.params.id;
    const query = "delete from user where id="+id;

    con.query(query,(error,result,index) => {
        if(error) throw error
        res.redirect('/ejs');
    })
})

app.post('/ejs',(req,res) => {
    // console.log(req.body);

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    const query = "insert into user(name,email,password)values('"+name+"','"+email+"','"+password+"')";

    con.query(query,(error,result,index) => {
        if(error) throw error
        res.redirect('/ejs');
    })
})

app.get('/update/:id',(req,res) => {

    const id = req.params.id;
    const query = "select * from user where id="+id;

    con.query(query,(error,result,index) => {
        if(error) throw error
        res.render('update',{result});
    })
})

app.post('/update/:id',(req,res) => {

    var id = req.params.id
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    const query = "update user set name='"+name+"',email='"+email+"',password='"+password+"' where id="+id;

    con.query(query,(error,result,index) => {
        if(error) throw error
        res.redirect('/ejs');
    })
})

app.listen(3000);
