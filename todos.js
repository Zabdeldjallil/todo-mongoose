const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed || false
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
