const DailyLog = require('../models/DailyLog');
const { parseSymptoms } = require('../services/geminiService');


exports.createLog = async (req, res) => {
  try {
    const { rawInput, mood, sleep } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existing = await DailyLog.findOne({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow }
    });

    if (existing) {
      return res.status(400).json({ message: 'You already logged today' });
    }

    
    console.log('Parsing symptoms with Gemini...');
    const parsedSymptoms = await parseSymptoms(rawInput);
    console.log('Parsed symptoms:', parsedSymptoms);

    const log = await DailyLog.create({
      userId: req.userId,
      rawInput,
      mood,
      sleep,
      parsedSymptoms
    });

    res.status(201).json({ message: 'Log saved', log });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getLogs = async (req, res) => {
  try {
    const logs = await DailyLog.find({ userId: req.userId }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getTodayLog = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const log = await DailyLog.findOne({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow }
    });

    res.json(log);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};