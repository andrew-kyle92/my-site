// Middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');

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

// Setting static and other middleware configs
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'My sercret keystring',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Mongoose Connection Parameters
mongoose.connect('mongodb://localhost:27017/personalDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
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

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Post and Get requests

// Home Page
app.get('/', function(req, res){    
    const homeTitle = 'Home';
    var link = "/login";
    var note = "Login";

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
    var link = "/login";
    var note = "Login";

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
    var link = "/login";
    var note = "Login";

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
    var link = "/login";
    var note = "Login";

    res.render('login', {
        title: loginTitle,
        data: getDate(),
        link: link,
        note: note
    });
});

// Registration Page
app.get('/register', function(req,res){
    const registerTitle = "Register";
    var link = "/login";
    var note = "Login";

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

    User.findById({_id: userId}, function(err, foundId){
        if(err){
            console.log(err);
        }
        else {
            let link = "/profile/" + foundId._id;
            let note = foundId.fname;
            res.render('profile', {
                title: "Profile | " + foundId.fname,
                data: "Hello, " + foundId.username,
                link: link,
                note: note
            });
        }
    });
});

// Post for Logging Out
app.get("/logout", function(req, res){
    req.logOut();

    res.redirect("/");
});

// Post Request for Login
app.post('/login', function(req,res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.logIn(user, function(err){
        if(err){console.log(err);}
        else{
            User.findOne({username: user.username}, function(err, foundUser){
                if(err){
                    console.log(err);
                }
                else{
                    passport.authenticate('local')(req, res, function(){
                        res.redirect('/profile/' + foundUser._id);
                    });
                }
            })
        }
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

    User.register({
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        username: data.uname
    }, req.body.password, function(err, user){
        if(err){
            console.log(err);
        }

        User.findOne({fname: data.fname}, function(err, foundUser){
            if(err){
                console.log(err);
            }
            else {

                passport.authenticate('local')(req, res, function(){
                res.redirect('/profile/' + foundUser._id);
                });
            }
        });
    });
});












app.listen(3000, function(){
    console.log("Server started on port 3000");
});