import './TodoApp.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const API_URL = 'http://localhost:5000/api/todos'; // change if needed

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  

  // ✅ Load todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data); // assuming your backend returns an array of todos
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    };

    fetchTodos();
  }, []);

  // ✅ Add todo
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(API_URL, { title: newTodo });
      setTodos([...todos, response.data]); // assuming backend returns the new todo
      setNewTodo('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // ✅ Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { completed });
    // Update the todo in state with the new completed status
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  } catch (err) {
    console.error('Error updating todo:', err);
  }
};
return (
  <div className="todo-container">
    <div className="todo-banner">
      <h2>TODO LIST</h2>
    </div>

    <div className="input-group">
      <input
        type="text"
        placeholder="Enter a task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>

    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </ul>
  </div>
);
}

export default TodoApp;
