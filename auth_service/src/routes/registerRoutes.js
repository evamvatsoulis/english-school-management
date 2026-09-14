const express = require('express');
const router = express.Router();
const { register, getUsers } = require('../controllers/registerController');

router.post('/', register);
router.get('/', getUsers);

module.exports = router;