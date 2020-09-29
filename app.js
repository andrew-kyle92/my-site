// Middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
    secret: 'Andrew Site',
    resave: false,
    saveUninitialized: true
}));


// Post and Get requests

// Home Page
app.get('/', function(req, res){    
    const homeTitle = 'Home';
    const cookie = req.cookies;
    if(cookie.Authenticated){
        User.findById({_id: cookie.Authenticated}, function(err, foundUser){
            if(err){
                console.log(err);
            }
            else{
                var link = "/profile/" + cookie.Authenticated;
                var note = foundUser.fname;
                res.redirect('/profile');
            }
        })
        
    }
    else{
        res.cookie("name", "guest");
        var link = "/login";
        var note = "Login"
    }
    res.render('home', {
        title: homeTitle,
        data: getDate(),
        link: link,
        note: note
    });
});

// Work History Page
app.get('/workhistory', function(req, res) {
    const title = "Work History"
    let cookie = req.cookieParser
    if(cookie === "authenticated"){
        var link = "/profile/" + cookie.userId;
        var note = cookie.fName
    }
    else{
        res.cookie("name", "guest");
        var link = "/login";
        var note = "Login"
    }
    res.render('history', {
        title: title,
        data: getDate(),
        link: link,
        note: note
    });
});

// About Page
app.get('/about', function(req,res){
    const aboutTitle = "About Me";
    let cookie = req.cookieParser
    if(cookie === "authenticated"){
        var link = "/profile/" + cookie.userId;
        var note = cookie.fName
    }
    else{
        res.cookie("name", "guest");
        var link = "/login";
        var note = "Login"
    }
    res.render('about', {
        title: aboutTitle,
        data: getDate(),
        link: link,
        note: note
    });
});

// Login Page
app.get('/login', function(req, res){
    const loginTitle = "Login";
    let cookie = req.cookieParser
    if(cookie === "authenticated"){
        var link = "/profile/" + cookie.userId;
        var note = cookie.fName
    }
    else{
        res.cookie("name", "guest");
        var link = "/login";
        var note = "Login"
    }
    res.render('login', {
        title: loginTitle,
        data: getDate(),
        link: link,
        note
    });
});

// Registration Page
app.get('/register', function(req,res){
    const registerTitle = "Register";
    let cookie = req.cookieParser
    if(cookie === "authenticated"){
        var link = "/profile/" + cookie.userId;
        var note = cookie.fName
    }
    else{
        res.cookie("name", "guest");
        var link = "/login";
        var note = "Login"
    }
    res.render("register", {
        title: registerTitle,
        data: getDate(),
        link: link,
        note: note
    });

});

// User Profile Page
app.get('/profile/:userId', function(req, res){
    const userId = req.params.userId;
    let cookie = req.cookieParser
    if(cookie === "authenticated"){
        var link = "/profile/" + cookie.userId;
        var note = cookie.fName
    }
    else{
        res.cookie("name", "guest");
        var link = "/login";
        var note = "Login"
    }

    User.findById({_id: userId}, function(err, foundId){
        if(err){
            console.log(err);
        }
        else {
            res.render('profile', {
                title: "Profile | " + foundId.fname,
                data: "Hello, " + foundId.username,
                link: link,
                note: note
            });
        }
    });
});

// Post Request for Login
app.post('/login', function(req,res){
    const data = {
        username: req.body.username,
    }

    User.findOne({username: data.username}, function(err, user){
        if(err){
            console.log(err);
        }

        bcrypt.compare(req.body.password, user.password, function(error, result){
            if(error){
                console.log(error)
            }

            if(result){
                console.log(user.fname + " has authenticated");
                res.clearCookie('name');
                res.cookie('Authenticated', String(user._id), {
                    maxAge: 28000000
                });
                res.redirect("/profile/" + user._id);
            }
        });

    });
});

// Post Request for Register
app.post('/register', function(req,res){
    const data = {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        uname: req.body.uname,
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        if (err) {
            console.log(err);
        }

        if(hash){
            const user = new User({
                email: data.email,
                fname: data.fname,
                lname: data.lname,
                username: data.uname,
                password: hash
            });
        
            user.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("New user created.")
                }
            });
        }
    });

    User.find({email: data.email}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/profile/' + foundUser._id);
        }
    });
});












app.listen(3000, function(){
    console.log("Server started on port 3000");
});