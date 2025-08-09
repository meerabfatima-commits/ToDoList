const Todo = require('../models/Todo');  

// Create a new todo
const createTodo = async (req, res) => {
    console.log("Incoming POST data:", req.body);
  try {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    console.log("Saved to DB:", todo);
    res.status(201).json(todo);  // Send the created todo back
  } catch (err) {
    console.error('Error creating todo:', err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);  // Return the list of todos
  } catch (err) {
    console.error('Error fetching todos:', err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // Return the updated document
    );
    res.status(200).json(updated);  // Return the updated todo
  } catch (err) {
    console.error('Error updating todo:', err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();  // No content (successful deletion)
  } catch (err) {
    console.error('Error deleting todo:', err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
};
