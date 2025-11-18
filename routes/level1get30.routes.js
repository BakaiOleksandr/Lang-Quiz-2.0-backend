const express = require('express');
const Word = require('../models/Word');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const level_1 = await Word.aggregate([
      // //match first words in engl and nnl
      // {$match: {en: {$exists: true}, nl: {$exists: true}}},
      //randomly select spesified number of documents
      {$sample: {size: 30}},
    ]);
    res.status(200).json(level_1);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
