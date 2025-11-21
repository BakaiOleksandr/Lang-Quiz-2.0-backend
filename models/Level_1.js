const mongoose = require('mongoose');

const level_1 = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User',unique:true},
  level: {type: Number, default: 1},
  total_plays: {type: Number, default: 0},
  total_score: {type: Number, default: 0},
  average_score: {type: Number, default: 0},
  total_mistakes: {type: Number, default: 0},
  difficulty:{type:String,default:'easy'},
});


//EXPORT
module.exports = mongoose.model('Level_1', level_1);
