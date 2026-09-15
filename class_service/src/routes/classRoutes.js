const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClass } = require('../controllers/classController');

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClass);

module.exports = router;