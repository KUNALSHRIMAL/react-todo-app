import { useState } from 'react'

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onAddTodo(input)
      setInput('')
    }
  }

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          autoFocus
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={!input.trim()}
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoInput
