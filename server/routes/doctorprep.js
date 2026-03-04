const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generatePrep, getPrep } = require('../controllers/doctorPrepController');

router.post('/generate', auth, generatePrep);
router.get('/', auth, getPrep);

module.exports = router;