const mongoose = require('mongoose');

const level_2 = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User',unique:true},
  level: {type: Number, default: 2},
  total_plays: {type: Number, default: 0},
  total_score: {type: Number, default: 0},
  average_score: {type: Number, default: 0},
  total_mistakes: {type: Number, default: 0},
  difficulty:{type:String,default:'hard'},
});


//EXPORT
module.exports = mongoose.model('Level_2', level_2);
