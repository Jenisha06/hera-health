const DailyLog = require('../models/DailyLog');
const CycleLog = require('../models/CycleLog');
const PatternResult = require('../models/PatternResult');
const DoctorPrep = require('../models/DoctorPrep');
const { generateDoctorPrep } = require('../services/geminiService');

exports.generatePrep = async (req, res) => {
  try {
    // Get last 28 days of logs
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 28);

    const logs = await DailyLog.find({
      userId: req.userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    const cycles = await CycleLog.find({
      userId: req.userId
    }).sort({ periodStartDate: -1 }).limit(3);

    // Get existing risk flags
    const patternResult = await PatternResult.findOne({ userId: req.userId });
    const riskFlags = patternResult?.riskFlags?.map(f => f.condition) || [];

    if (logs.length < 3) {
      return res.status(400).json({
        message: 'You need at least 3 days of logs to generate a doctor prep sheet.'
      });
    }

    // Generate with Groq
    const result = await generateDoctorPrep(logs, cycles, riskFlags);

    if (!result) {
      return res.status(500).json({ message: 'Failed to generate prep sheet' });
    }

    // Save to MongoDB
    const prep = await DoctorPrep.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        generatedAt: new Date(),
        summaryText: result.summary,
        questionsForDoctor: result.questions,
        symptomHighlights: result.highlights
      },
      { upsert: true, new: true }
    );

    res.json(result);
} catch (err) {
    console.log('Doctor prep error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getPrep = async (req, res) => {
  try {
    const prep = await DoctorPrep.findOne({ userId: req.userId });
    res.json(prep);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};