const Todo = require('../models/todo.model');

const getTodos = async (req, res) => {
  try {
    // Get todos for authenticated user
    const todos = await Todo.find({ userId: req.userId })
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v'); // Exclude version field
    
    res.json({
      status: 'success',
      data: {
        count: todos.length,
        todos
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving todos'
    });
  }
};

module.exports = {
  getTodos
}; 