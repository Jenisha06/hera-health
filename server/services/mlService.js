const axios = require('axios');

exports.analyzePatterns = async (logs, cycles) => {
  try {
    const res = await axios.post('http://localhost:5001/analyze', {
      logs,
      cycles
    });
    return res.data;
  } catch (err) {
    console.log('ML Service error:', err.message);
    return {
      correlations: [],
      riskFlags: [],
      weeklyInsight: 'Pattern analysis unavailable right now.'
    };
  }
};