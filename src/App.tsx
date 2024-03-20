import { useState } from 'react'
import Task from './components/tasks'
import './App.css'
import Virtualize from './virtualize/virtualize';

function App() {

  interface todos{
    task : string,
    id : string,
  }
  const [todos, setTodos] = useState<todos[]>([]);
  
  const handleAddTask = () => {
    const elem = document.querySelector('.input')
    const todo : todos = {task : (elem as HTMLInputElement).value,
     id :crypto.randomUUID()}
  
    setTodos(prevTasks => [...prevTasks, todo]);
    if (elem)
      (elem as HTMLInputElement).value = '';
  };

  const removeTodo = (id : string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const removeAll = () => {
    const newTodos : todos[] = [];
    setTodos(newTodos);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className='container'>
      <p className='head'>Todo App</p>
      <div className='inputCont'>
        <input className='input' placeholder='Add a new task' onKeyDown={handleKeyDown} ></input>
        <p className='button' onClick={handleAddTask}>Add</p>
      </div>

      
      {todos.map((todo) => (
        <Task key={todo.id} todo={todo} onDelete={() => removeTodo(todo.id)}/>
      ))}

      <footer>
        <p>you have {todos.length} tasks in total</p>
        <p className='clearAll' onClick={removeAll}>Clear All</p>
      </footer>
    </div>
  )
}

export default App


// component isolation , left handling