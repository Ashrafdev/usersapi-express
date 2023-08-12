const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory data structure for user data
const users = [];

// Create a new user
app.post('/users', (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newUser = { id, name, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// Get all users
app.get('/users', (req, res) => {
  return res.json(users);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.name = name || user.name;
  user.email = email || user.email;
  return res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  return res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;