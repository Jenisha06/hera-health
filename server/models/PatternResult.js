const mongoose = require('mongoose');

const patternResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  generatedAt: { type: Date, default: Date.now },
  correlations: [
    {
      symptomA: { type: String },
      symptomB: { type: String },
      strength: { type: Number },
      insight: { type: String }
    }
  ],
  riskFlags: [
    {
      condition: { type: String },
      confidence: { type: String },
      message: { type: String }
    }
  ],
  weeklyInsight: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PatternResult', patternResultSchema);