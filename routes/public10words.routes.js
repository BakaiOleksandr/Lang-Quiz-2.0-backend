const express = require('express');
const Word = require('../models/Word');
const router = express.Router();

//GET 10 random word in PublicPage
router.get('/', async (req, res) => {
  try {
    //..................
    const publicWords = await Word.aggregate([
      // //match first words in engl and nnl
      // {$match: {en: {$exists: true}, nl: {$exists: true}}},
      //randomly select spesified number of documents
      {$sample: {size: 3}},
    ]);
    res.status(200).json(publicWords);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
