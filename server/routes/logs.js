const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createLog, getLogs, getTodayLog } = require('../controllers/logController');

router.post('/', auth, createLog);
router.get('/', auth, getLogs);
router.get('/today', auth, getTodayLog);

module.exports = router;