// Middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieSession = require('cookie-session');
//const SC = require('soundcloud');

// Date Function
function getDate(){
    const today = new Date;
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    return today.toLocaleDateString("en-US", options);
}

// Mongoose Connection Parameters
mongoose.connect('mongodb://localhost:27017/personalDB', {useNewUrlParser: true, useUnifiedTopology: true});

// Database Schema
const userSchema = new mongoose.Schema({
    email: String,
    fname: String,
    lname: String,
    username: String,
    password: String,
    comments: [{
        date: Date,
        title: String,
        post: String
    }]
});

const User = mongoose.model('User', userSchema);

// Setting static and other middleware configs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Post and Get requests

// Home Page
app.get('/', function(req, res){    
    const homeTitle = 'Home';
    res.render('home', {title: homeTitle, date: getDate()});
});

// Work History Page
app.get('/workhistory', function(req, res) {
    const title = "Work History"
    res.render('history', {title: title, date: getDate()});
});

// About Page
app.get('/about', function(req,res){
    const aboutTitle = "About Me | Family Man"
    res.render('about', {title: aboutTitle, date: getDate()});
});

// Login Page
app.get('/login', function(req, res){
    const loginTitle = "Login";
    res.render('login', {title: loginTitle, date: getDate()});
});

app.post('/login', function(req,res){
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    
    
})

// Registration Page
app.get('/register', function(req,res){
    const registerTitle = "Register";

    res.render("register", {title: registerTitle, date: getDate()});

});

app.post('/register', function(req,res){
    const data = {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        uname: req.body.uname,
        password: req.body.password
    }

    const user = new User({
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        username: data.uname,
        password: data.password
    });

    user.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("New user created.")
        }
    })

    res.redirect('/');
});












app.listen(3000, function(){
    console.log("Server started on port 3000");
});