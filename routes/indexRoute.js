const express = require('express');
const router = express.Router();
const fs = require('fs');
let musicList = [];

router.get('/', (req, res) => {
    musicList = [];
    const musicFolder = './public/music/';
    fs.readdir(musicFolder, (err, files) => {
        files.forEach(file => {
            musicList.push(file);
        });
        console.log('Music List')
        console.log(musicList);
        res.render('index.hbs', { songs: musicList });
    });
});

module.exports = router;