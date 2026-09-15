const express = require('express');
const router = express.Router();
const { getAllHealths, getServiceHealth } = require('../controllers/healthController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getAllHealths);
router.get('/:serviceName', getServiceHealth);

module.exports = router;