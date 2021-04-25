// About Page Route
let express = require("express");
let router = express.Router();
const fs = require('fs');
let albumsPath = "public/audio/Music/";
let album1 = fs.readdirSync(albumsPath + "Album1");
let album2 = fs.readdirSync(albumsPath + "Album2");
let album3 = fs.readdirSync(albumsPath + "Album3");
let loveAlbum = fs.readdirSync(albumsPath + "Love");

let songList = {
    "Album 1": album1,
    "Album 2": album2,
    "Album 3": album3,
    "Love": loveAlbum
}

router.get('/about', function(req,res){
    const aboutTitle = "About Me";
    let d = new Date();
    scripts = ['scripts/script.js']
    res.render('about', {
        title: aboutTitle,
        scripts: scripts,
        date: d.getFullYear(),
        guitar: d.getFullYear() - 2004,
        songs: songList,
    });
});

module.exports = router;