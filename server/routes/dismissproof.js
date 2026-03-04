const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateResponse } = require('../controllers/dismissProofController');

router.post('/generate', auth, generateResponse);

module.exports = router;