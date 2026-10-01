const express = require('express');
const router = express.Router();
const { exportToPdf } = require('../controllers/exportController');

router.get('/pdf', exportToPdf);

module.exports = router;