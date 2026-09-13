const express = require('express');

const router = express.Router();

const quranController = require('../../controller/quran/quranController.js');

router.get('/surah', quranController.getAllSurah);
// router.get('/surah/:surahNum', quranController.getSurah);
// router.get('/surah/:surahNum/:ayahNUm', quranController.getSurah);

module.exports = router;