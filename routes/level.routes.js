const express = require('express');
const router = express.Router();
const isAuth = require('../jwt.middleware/jwt.middleware');
const Level_1 = require('../models/Level_1');

router.get('/level1/update', isAuth, async (req, res) => {
  try {
    const userId = req.payload._id;

    const level = await Level_1.findOne({user: userId});

    if (!level) {
      return res.status(404).json({message: 'Level not found'});
    }

    res.json(level);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
});
//UPDATE total_plays
router.post('/level1/totalplays', isAuth, async (req, res) => {
  try {
    const userId = req.payload._id;
    const {total_plays} = req.body;
    const level = await Level_1.findOneAndUpdate(
      {user: userId},
      {
        total_plays,
      },
      {new: true}
    );
    if (!level) {
      return res.status(404).json({message: 'Document hasnt found '});
    }
    res.status(200).json(level);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});
//TOTAL MISTAKES
router.post('/level1/mistakes', isAuth, async (req, res) => {
  try {
    const userId = req.payload._id;
    const {total_mistakes} = req.body;
    const level = await Level_1.findOneAndUpdate(
      {user: userId},
      {
        total_mistakes,
      },
      {new: true}
    );
    if (!level) {
      return res.status(404).json({message: 'Document hasnt found '});
    }
    res.status(200).json(level);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

//EXPORT
module.exports = router;
