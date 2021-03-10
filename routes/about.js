// About Page Route
let express = require("express");
let router = express.Router();
let date = require("../controllers/dateController")

router.get('/about', function(req,res){
    const aboutTitle = "About Me";
    scripts = ['scripts/script.js']
    res.render('about', {
        title: aboutTitle,
        data: date.getDate(),
        scripts: scripts,
    });
});

module.exports = router;