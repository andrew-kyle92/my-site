// Projects Page Route
let express = require('express');
let router = express.Router()
let date = require("../controllers/dateController")

router.get('/projects', function(req, res){    
    const homeTitle = 'Projects';
    d = new Date();
    let scripts = ['scripts/script.js'];
    res.render('projects', {
        title: homeTitle,
        scripts: scripts,
        date: d.getFullYear(),
    });
});

module.exports = router;