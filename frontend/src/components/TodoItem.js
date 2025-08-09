import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem',
        borderBottom: '1px solid #ccc'
      }}
    >
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flex: 1
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id, !todo.completed)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </span>
      </label>

      <button
        onClick={() => onDelete(todo._id)}
        style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.3rem 0.6rem',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
