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
//Create new level
//POST:new level 1
router.post('/newlevel1', async (req, res) => {
  try {
    //chek unique email
    const existing = await Student.findOne({email: req.body.email});
    if (existing) {
      console.log(`Email already exist ${existing.email}`);
      return res.status(404).json({error: 'Email already exist!'});
    }
    const newStudent = new Student(req.body);
    await newStudent.save();
    console.log(`${newStudent.firstName} ${newStudent.lastName} was created`);
    res.json(newStudent);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
module.exports = router;
