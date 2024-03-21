import {  useRef } from 'react'
import { memo } from 'react';
import './tasks.css'

interface todos{
  task : string,
  id : string,
  clicks : number,
  check : number,
}

const Task = memo(function Task({ todo, onDelete, handleClick, handlEdit, handleCheck }
                  : { todo: todos; onDelete: () => void; handleClick: () => void; handlEdit :(id : string, task:string)=> void,
                      handleCheck :(id : string)=> void } ) {
  
  const inputRef = useRef<HTMLInputElement | null>(null)
  const deleteRef = useRef<HTMLInputElement | null>(null)
  const editRef = useRef<HTMLInputElement | null>(null)
  const checkRef = useRef<HTMLInputElement | null>(null)


  if (todo.check == 1)
  {
      if (inputRef.current)
      inputRef.current.style.textDecoration =  "line-through";
      checkRef.current?.classList.add('checked')
  }


  const myhandleEdit = () =>{
    if (inputRef.current)
    
    {
      if (inputRef.current.readOnly){
        inputRef.current.readOnly = false;
        deleteRef.current?.classList.add('hidden')
        checkRef.current?.classList.add('hidden') 
        editRef.current?.classList.add('save')
      }
      else{
        inputRef.current.readOnly = true;
        deleteRef.current?.classList.remove('hidden')
        checkRef.current?.classList.remove('hidden') 
        editRef.current?.classList.remove('save')
        todo.task = inputRef.current.value;
        {handlEdit}
      }
    }
  }




  const myhandleCheck = () =>{
    if (inputRef.current)
    {
      if (todo.check == 1)
      {
        inputRef.current.style.textDecoration = 'none';
        checkRef.current?.classList.remove('checked');
        todo.check = 0;
        {handleCheck}
      }
      else {
        inputRef.current.style.textDecoration =  "line-through";
        checkRef.current?.classList.add('checked')
        todo.check = 1;
        {handleCheck}
      }
    }
  }

  return (
    <div className='task'>
        <p className='check' ref={checkRef} onClick={myhandleCheck}></p>
        <p className='count'>{todo.clicks}</p>
        <input className='text' type='text' defaultValue={todo.task} ref={inputRef} onClick={handleClick} readOnly/>
        <p className='delete' ref={deleteRef} onClick={onDelete}></p>
        <p className='edit' ref={editRef} onClick={myhandleEdit}></p>
    </div>
  )
});

export default Task