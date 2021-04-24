// About Page Route
let express = require("express");
let router = express.Router();
let date = require("../controllers/dateController")

router.get('/about', function(req,res){
    const aboutTitle = "About Me";
    let d = new Date();
    scripts = ['scripts/script.js']
    res.render('about', {
        title: aboutTitle,
        scripts: scripts,
        date: d.getFullYear(),
        guitar: d.getFullYear() - 2004,
    });
});

module.exports = router;