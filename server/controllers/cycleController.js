const CycleLog = require('../models/CycleLog');


exports.createCycle = async (req, res) => {
  try {
    const { periodStartDate, periodEndDate, flowLevel, painLevel, notes } = req.body;

    const cycle = await CycleLog.create({
      userId: req.userId,
      periodStartDate,
      periodEndDate,
      flowLevel,
      painLevel,
      notes
    });

    res.status(201).json({ message: 'Cycle logged', cycle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getCycles = async (req, res) => {
  try {
    const cycles = await CycleLog.find({ userId: req.userId }).sort({ periodStartDate: -1 });
    res.json(cycles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateCycle = async (req, res) => {
  try {
    const cycle = await CycleLog.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!cycle) return res.status(404).json({ message: 'Cycle not found' });
    res.json({ message: 'Cycle updated', cycle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};