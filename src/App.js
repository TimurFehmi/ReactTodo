import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import {uuid} from 'uuidv4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  console.log(todos)

  useEffect(() => {
    const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY) 
    console.log(localStorageData === undefined)
    if(localStorageData) {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      setTodos(storedTodos)
    }
    setTodos([])
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (!name) {
      return
    }
    console.log(todos)
    setTodos([...todos, { id: uuid(), name: name, complete:false}])
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (

    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}> Add Todo</button>
    <button onClick={handleClearTodos}> Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </> 
  )
}

export default App;
