const mongoose = require('mongoose');

const doctorPrepSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  generatedAt: { type: Date, default: Date.now },
  summaryText: { type: String },
  questionsForDoctor: [{ type: String }],
  symptomHighlights: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('DoctorPrep', doctorPrepSchema);