const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    en:{type:String},
    nl:{type:String},
    ru:{type:String},
    ua:{type:String},
    es:{type:String},
    fr:{type:String},
  }
);

module.exports = mongoose.model('Word', wordSchema);
