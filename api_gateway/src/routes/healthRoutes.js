const express = require('express');
const router = express.Router();
const { getAllHealths, getServiceHealth } = require('../controllers/healthController');

router.get('/', getAllHealths);
router.get('/:serviceName', getServiceHealth);

module.exports = router;