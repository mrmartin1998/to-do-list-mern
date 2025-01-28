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

const createTodo = async (req, res) => {
  try {
    const { title, description, status = 'pending' } = req.body;
    
    // Create new todo with user association
    const todo = new Todo({
      title,
      description,
      status,
      userId: req.user._id  // From auth middleware
    });
    
    await todo.save();
    
    res.status(201).json({
      status: 'success',
      data: {
        todo
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo data',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Error creating todo'
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Validate allowed update fields
    const allowedUpdates = ['title', 'description', 'status'];
    const updateFields = Object.keys(updates);
    const isValidOperation = updateFields.every(field => allowedUpdates.includes(field));
    
    if (!isValidOperation) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid updates'
      });
    }
    
    // Find todo and verify ownership
    const todo = await Todo.findOne({ _id: id, userId: req.user._id });
    
    if (!todo) {
      return res.status(404).json({
        status: 'error',
        message: 'Todo not found'
      });
    }
    
    // Apply updates
    updateFields.forEach(field => todo[field] = updates[field]);
    await todo.save();
    
    res.json({
      status: 'success',
      data: {
        todo
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo data',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo ID'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Error updating todo'
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo
}; 