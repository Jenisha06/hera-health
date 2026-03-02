const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createCycle, getCycles, updateCycle } = require('../controllers/cycleController');

router.post('/', auth, createCycle);
router.get('/', auth, getCycles);
router.put('/:id', auth, updateCycle);

module.exports = router;