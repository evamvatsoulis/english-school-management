const express = require('express');
const router = express.Router();
const { getAllHealths } = require('../controllers/healthController');

router.get('/', getAllHealths);

module.exports = router;