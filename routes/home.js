// Home Page Route
let express = require('express');
let router = express.Router()
let date = require("../controllers/dateController")

router.get('/', function(req, res){    
    const homeTitle = 'Home';
    let scripts = ['scripts/script.js']
    res.render('home', {
        title: homeTitle,
        data: date.getDate(),
        scripts: scripts,
    });
});

module.exports = router;