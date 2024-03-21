import { useState } from 'react'
import Task from '../tasks/tasks'
import './main.css'
import Virtualize from '../virtualize/virtualize';

function Main() {

  interface todos{
    task : string,
    id : string,
    clicks : number,
    check : number,
  }
  const [todos, setTodos] = useState<todos[]>([]);

  const handleAddTask = () => {
    const elem = document.querySelector('.input')
    const todo : todos = {task : (elem as HTMLInputElement).value,
      id :crypto.randomUUID(), 
      clicks : 0,
      check : 0,
    }
  

  
  setTodos(prevTasks => [...prevTasks, todo]);
    if (elem)
      (elem as HTMLInputElement).value = '';
  };

  const handleClick = (id : string)=>{
    setTodos((prevTodos)=> prevTodos.map((item) => item.id === id ? {...item, clicks: item.clicks + 1} : item))
  }

  const handleEdit = (id : string, newTask : string) => {
    setTodos((prevTodos)=> prevTodos.map((item) => item.id === id ? {...item, task: newTask} : item))
  }

  const handleCheck = (id : string) => {
    setTodos((prevTodos)=> prevTodos.map((item) => item.id === id ? {...item,  check: ( item.check == 0? 1 : 0)} : item))
  }


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


  const renderItem = (todo : todos) : JSX.Element =>{
    return(<Task key={todo.id} todo={todo} handleClick={() => handleClick(todo.id)} onDelete={() => removeTodo(todo.id)} handleCheck={()=>handleCheck(todo.id)} handlEdit={()=>handleEdit(todo.id, todo.task)}/>)
  }
  

  return (
    <div className='container'>
      <p className='head'>Todo App</p>
      <div className='inputCont'>
        <input className='input' placeholder='Add a new task' onKeyDown={handleKeyDown} ></input>
        <p className='button' onClick={handleAddTask}>Add</p>
      </div>



      <Virtualize itemsCount={todos.length} todos={todos} heightOfItem={52} renderAnItem={renderItem} heightOfWindow={400} />
  

      <footer>
        <p>you have {todos.length} tasks in total</p>
        <p className='clearAll' onClick={removeAll}>Clear All</p>
      </footer>
    </div>
  )
}

export default Main


// component isolation , left handling
// save edit task in state