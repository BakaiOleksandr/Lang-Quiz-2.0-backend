const { Schema, model } = require("mongoose");

const emailCodeSchema = new Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 600sec=10min
  }
});



module.exports = model("EmailCode", emailCodeSchema);
