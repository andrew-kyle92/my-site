// Middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

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
const loginSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});

const Login = mongoose.model('Login', loginSchema);

// Setting static and other middleware configs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Post and Get requests

// Home Page
app.get('/', function(req, res){
    const homeTitle = 'Home';
    res.render('home', {title: homeTitle});
});

// Work History Page
app.get('/workhistory', function(req, res) {
    const title = "Work History"
    res.render('history', {title: title})
});

// Login Page
app.get('/login', function(req, res){
    const loginTitle = "Login";
    res.render('login', {title: loginTitle})
});












app.listen(3000, function(){
    console.log("Server started on port 3000");
});