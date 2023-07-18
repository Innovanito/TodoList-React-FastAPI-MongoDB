// @bekbrace
// FARMSTACK Tutorial - Sunday 13.06.2021
import axios from 'axios'
import React from 'react'

function TodoItem(props) {

    const deleteTodoHandler = (title) => {
    axios.delete(`http://localhost:8000/api/todo/${title}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

  const updateTodo = (title, desc) => {
    axios.put(`http://localhost:8000/api/todo/${title}`, {'title': title, 'description': desc})
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }
  
    return (
        <div>
            <p>
                <span style={{ fontWeight: 'bold, underline' }}>{props.todo.title} : </span> {props.todo.description} 
                <button onClick={() => deleteTodoHandler(props.todo.title)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X</button>
                <button onClick={() => updateTodo(props.todo.title, props.todo.description)} className='btn btn-success mx-2 my-2' style={{ 'borderRadius': '50px', }}>U</button>
                <hr></hr>
            </p>
        </div>
    )
}

export default TodoItem;