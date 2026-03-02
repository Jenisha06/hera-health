const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  rawInput: { type: String },
  parsedSymptoms: [
    {
      tag: { type: String },
      severity: { type: String }
    }
  ],
  mood: { type: Number, min: 1, max: 5 },
  sleep: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);