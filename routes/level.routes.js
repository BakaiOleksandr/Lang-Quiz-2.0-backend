const express = require('express');
const Level_1 = require('../models/Level_1');
const router = express.Router();
const isAuth = require('../jwt.middleware/jwt.middleware');

//CREATE LEVEL 1
router.post('/1/create', isAuth, async (req, res) => {
  try {
    const userId = req.payload._id;
    let userLevel = await Level_1.findOne({user: userId});

    if (userLevel) {
      // console.log('Already exists, returning existing doc');
      return res.status(200).json(userLevel);
    }

    const createResults = await Level_1.create({
      user: userId,
      level: 1,
      total_plays: 0,
      total_score: 0,
      average_score: 0,
      total_mistakes: 0,
      difficulty: 'easy',
    });
    res.status(201).json(createResults);
    console.log('Level1 was Created');
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
//GET All data from Level_1
router.get('/1/get', isAuth, async (req, res) => {
  try {
    const userId = req.payload._id;
    const dataLevel_1 = await Level_1.findOne({user: userId});
    res.status(200).json(dataLevel_1);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
module.exports = router;
