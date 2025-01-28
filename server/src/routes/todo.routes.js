const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTodos, createTodo } = require('../controllers/todo.controller');

router.get('/', auth, getTodos);
router.post('/', auth, createTodo);

module.exports = router; 