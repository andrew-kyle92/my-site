// Middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
let home = require("./routes/home");
let about = require("./routes/about")

// Setting static and other middleware configs
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// ROUTES

// Home Page
app.get("/", home);
// About Page
app.get("/about", about);

app.listen(3000, function(){
    console.log("Server started on port 3000");
});