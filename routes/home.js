// Home Page Route
let express = require('express');
let router = express.Router()
let date = require("../controllers/dateController")

router.get('/', function(req, res){    
    const homeTitle = 'Home';
    d = new Date();
    let scripts = ['scripts/script.js'];
    res.render('home', {
        title: homeTitle,
        scripts: scripts,
        date: d.getFullYear(),
    });
});

module.exports = router;