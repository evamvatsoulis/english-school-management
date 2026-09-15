const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClass, updateClass } = require('../controllers/classController');

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClass);
router.patch('/:id', updateClass);

module.exports = router;