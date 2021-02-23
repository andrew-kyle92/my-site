// Home Page Route
let express = require('express');
let router = express.Router()
let date = require("../controllers/dateController")

router.get('/', function(req, res){    
    const homeTitle = 'Home';
    res.render('home', {
        title: homeTitle,
        data: date.getDate(),
    });
});

module.exports = router;