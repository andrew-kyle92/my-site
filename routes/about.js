// About Page Route
let express = require("express");
let router = express.Router();
let date = require("../controllers/dateController")

router.get('/about', function(req,res){
    const aboutTitle = "About Me";
    res.render('about', {
        title: aboutTitle,
        data: date.getDate(),
    });
});

module.exports = router;