// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = []; // In-memory data store

// Routes
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todo.id = todos.length ? todos[todos.length - 1].id + 1 : 1; // Auto-increment ID
  todos.push(todo);
  res.status(201).json(todo);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  Object.assign(todo, req.body); // Update todo with new data
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Todo not found');
  todos.splice(index, 1); // Remove the todo from the array
  res.status(204).send(); // No content
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
