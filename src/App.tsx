import { useState, useEffect } from 'react';
import './App.css';
import { FaSun, FaMoon, FaCalendarAlt, FaTrash } from 'react-icons/fa';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <div className="todo-container">
        <div className="header">
          <h1>To-Do List</h1>
          <FaCalendarAlt className="calendar-icon" />
        </div>
        <div className="add-todo">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="todo-item">
                <div className="checkbox" onClick={() => handleToggleComplete(todo.id)}>
                  {todo.completed && '✔'}
                </div>
                <span>{todo.text}</span>
              </div>
              <button onClick={() => handleDeleteTodo(todo.id)} className="delete-icon">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        {todos.length > 0 && (
          <button onClick={handleDeleteAll} className="delete-all-btn">
            Delete All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
