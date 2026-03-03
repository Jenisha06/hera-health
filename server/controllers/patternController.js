const DailyLog = require('../models/DailyLog');
const CycleLog = require('../models/CycleLog');
const PatternResult = require('../models/PatternResult');
const { analyzePatterns } = require('../services/mlService');

exports.getPatterns = async (req, res) => {
  try {
   
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await DailyLog.find({
      userId: req.userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: 1 });

    const cycles = await CycleLog.find({
      userId: req.userId
    }).sort({ periodStartDate: -1 }).limit(6);

    if (logs.length < 3) {
      return res.json({
        correlations: [],
        riskFlags: [],
        weeklyInsight: 'Keep logging daily — Hera needs at least 3 days of data to find patterns.',
        logsCount: logs.length
      });
    }

   
    const mlResults = await analyzePatterns(logs, cycles);

    
    await PatternResult.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        generatedAt: new Date(),
        correlations: mlResults.correlations,
        riskFlags: mlResults.riskFlags,
        weeklyInsight: mlResults.weeklyInsight
      },
      { upsert: true, new: true }
    );

    res.json({
      ...mlResults,
      logsCount: logs.length
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};