const mongoose = require('mongoose');

const cycleLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  periodStartDate: { type: Date, required: true },
  periodEndDate: { type: Date },
  flowLevel: { type: Number, min: 1, max: 3 },
  painLevel: { type: Number, min: 1, max: 5 },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CycleLog', cycleLogSchema);