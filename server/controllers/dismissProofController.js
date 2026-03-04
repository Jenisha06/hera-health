const DailyLog = require('../models/DailyLog');
const { generateDismissProof } = require('../services/groqService');

exports.generateResponse = async (req, res) => {
  try {
    const { doctorSaid } = req.body;

    if (!doctorSaid) {
      return res.status(400).json({ message: 'Please tell us what your doctor said' });
    }

  
    const logs = await DailyLog.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(14);

    const symptoms = [];
    logs.forEach(log => {
      log.parsedSymptoms?.forEach(s => {
        if (!symptoms.includes(s.tag)) {
          symptoms.push(s.tag);
        }
      });
    });

   
    const result = await generateDismissProof(doctorSaid, symptoms);

    if (!result) {
      return res.status(500).json({ message: 'Failed to generate response' });
    }

    res.json(result);
  } catch (err) {
    console.log('Dismiss proof error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};