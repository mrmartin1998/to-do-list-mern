const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTodos } = require('../controllers/todo.controller');

router.get('/', auth, getTodos);

module.exports = router; 