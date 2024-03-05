import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css'
import { Todoitems } from './Todoitems';


let count= 0;
export const Todo = () => {

    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const  add = () => {
        setTodos([...todos, {no: count++, text: inputRef.current.value, display: "" }]);
        inputRef.current.value = "";
        count++;
        localStorage.setItem("todos_count", count)
    }

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")));
        count = localStorage.getItem("todos_count");
    }, [])

    useEffect(() => {
        setTimeout(() => {
            console.log(todos);
            localStorage.setItem("todos", JSON.stringify(todos));
        }, 100)
    },[todos])

    const handleEnter = async (e) => {
        if(e.key === 'Enter')
            add();
    }

    return (
    <div className="todo">
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input ref={inputRef} type="text" placeholder="Add Task..." className= "todo-input" onKeyDown={handleEnter} />
            <div onClick={() => {add()}} className="todo-add-btn">ADD</div>
        </div>
        <div className="todo-list">
            {todos.map((items, index)=>{
                return <Todoitems key ={index} setTodos= {setTodos} no={items.no} display= {items.display} text= {items.text}/>
            })}
        </div>
    </div>
  )
}
