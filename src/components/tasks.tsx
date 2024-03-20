import { useState, useRef } from 'react'
import './tasks.css'


interface todos{
  task : string,
  id : string,
}

function Task({ todo, onDelete }: { todo: todos; onDelete: () => void }) {
  
  const [count, setcount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null)
  const deleteRef = useRef<HTMLInputElement | null>(null)
  const editRef = useRef<HTMLInputElement | null>(null)
  const checkRef = useRef<HTMLInputElement | null>(null)

  const handleEdit = () =>{
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
      }
    }
  }

  const handleCheck = () =>{
    if (inputRef.current)
    {
      if (checkRef.current?.classList.contains('checked'))
      {
        inputRef.current.style.textDecoration = 'none';
        checkRef.current?.classList.remove('checked');
      }
      else {
        inputRef.current.style.textDecoration =  "line-through";
        checkRef.current?.classList.add('checked')
      }
    }
  }

  return (
    <div className='task'>
        <p className='check' ref={checkRef} onClick={handleCheck}></p>
        <p className='count'>{count}</p>
        <input className='text' type='text' defaultValue={todo.task} ref={inputRef} onClick={()=>setcount(count+1)} readOnly/>
        <p className='delete' ref={deleteRef} onClick={onDelete}></p>
        <p className='edit' ref={editRef} onClick={handleEdit}></p>
    </div>
  )
}

export default Task