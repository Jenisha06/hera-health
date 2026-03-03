const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getPatterns } = require('../controllers/patternController');

router.get('/', auth, getPatterns);

module.exports = router;