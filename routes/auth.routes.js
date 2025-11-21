const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Level_1 = require('../models/Level_1');
const chalk = require('chalk');
const isAuth = require('../jwt.middleware/jwt.middleware');
const router = express.Router();
const saltRounds = 10;
//Create NEW USER
router.post('/signup', async (req, res, next) => {
  try {
    const {email, password, name} = req.body;
    if (!email || !password || !name) {
      console.log(chalk.red('POST, Provide email, password and name'));
      return res.status(400).json({message: 'Please enter your data'});
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({message: 'Provide a valid email address.'});
    }
    const existing = await User.findOne({email});
    if (existing) {
      console.log(chalk.red('User already exists.'));
      return res.status(400).json({message: 'User already exists.'});
    }
    //hashing
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({email, password: passwordHash, name});
    const {_id} = newUser;
    const user = {_id, email, name};
    res.status(201).json({user: user});
    console.log(chalk.green(`User ${user.name} was created`));
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).json({message: err.message});
  }
});
//POST Verify User /LOGIN
router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Provide your data'});
    }
    const existingUser = await User.findOne({email});
    if (!existingUser) {
      res.status(401).json({message: 'User not found.'});
      return;
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect) {
      res.status(401).json({message: 'Unable to authenticate the user'});
      return;
    }
    //Create Level 1

    let level = await Level_1.findOne({user: existingUser._id});

    if (!level) {
      level = await Level_1.create({user: existingUser._id});
      console.log(
        chalk.yellow(`Level_1 created for user ${existingUser.name}`)
      );
    }
    //..............
    const {_id, name} = existingUser;
    const payload = {_id, email, name};
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '6h',
    });
    console.log(chalk.green(`${existingUser.name} get a token`));
    res.status(200).json({authToken, user: {email, name}});
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json({message: err.message});
  }
});
//GET
router.get('/verify', isAuth, async (req, res, next) => {
  // console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

//EXPORT MODULE
module.exports = router;
