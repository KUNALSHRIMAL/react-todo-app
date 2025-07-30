import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

// A key for our todos in localStorage
const TODOS_KEY = 'react-todo-list'

function App() {
  // Read todos from localStorage, or fall back to []
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(TODOS_KEY)
    try {
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([...todos, newTodo])
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const activeTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Todo List</h1>
          <p className="subtitle">Stay organized and get things done</p>
        </header>

        <TodoInput onAddTodo={addTodo} />

        <div className="stats">
          <span className="stat">
            {activeTodos.length} active
          </span>
          <span className="stat">
            {completedTodos.length} completed
          </span>
          {completedTodos.length > 0 && (
            <button 
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          )}
        </div>

        <TodoList 
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />

        {todos.length === 0 && (
          <div className="empty-state">
            <p>No todos yet. Add one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
