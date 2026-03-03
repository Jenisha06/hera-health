const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Save onboarding data
router.post('/onboarding', auth, async (req, res) => {
  try {
    const { age, lastPeriodDate, initialSymptoms } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { age, lastPeriodDate, initialSymptoms },
      { new: true }
    );

    res.json({ message: 'Onboarding complete', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/contacts', auth, async (req, res) => {
  try {
    const { emergencyContacts } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { emergencyContacts },
      { new: true }
    );
    res.json({ message: 'Contacts updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;