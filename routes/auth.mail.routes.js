const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');
const EmailCode = require('../models/EmailCode');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

router.post('/send-email-code', async (req, res) => {
  const {email} = req.body;

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Удаляем старые коды для этого email
    await EmailCode.deleteMany({email});

    // Создаём новый
    await EmailCode.create({email, code});

    await transporter.sendMail({
      to: email,
      subject: 'Language Quiz Email Confirmation',
      text: `Copy the code: ${code}`,
    });

    res.json({success: true, message: 'Code has been sent'});
  } catch (err) {
    res.status(500).json({success: false, message: 'Error of sending'});
  }
});

router.post('/verify-email-code', async (req, res) => {
  const {email, code} = req.body;

  const record = await EmailCode.findOne({email});

  if (!record) {
    return res
      .status(400)
      .json({success: false, message: 'The code is outdated or not found.'});
  }

  if (record.code !== code) {
    return res.status(400).json({success: false, message: 'Invalid code'});
  }

  // Delete code after successful sending
  await EmailCode.deleteMany({email});

  res.json({success: true, message: 'Email confirmed'});
});

module.exports = router;
