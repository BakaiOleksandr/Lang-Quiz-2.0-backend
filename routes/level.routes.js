const express = require('express');
const router = express.Router();
const isAuth = require('../jwt.middleware/jwt.middleware');
const Level_1 = require('../models/Level_1');

router.get('/level1', isAuth, async (req, res) => {
  try {
    const userId = req.payload._id; // id из токена

    const level = await Level_1.findOne({ user: userId });

    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }

    res.json(level);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
