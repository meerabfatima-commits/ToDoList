const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');
const Todo = require('./models/Todo');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('Connecting to Mongo URI:', MONGO_URI);


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB'); // 
    app.listen(PORT, () => {
      console.log(`Server is running on port 5000`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

