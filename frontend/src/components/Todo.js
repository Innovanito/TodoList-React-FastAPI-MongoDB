import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function TodoItem(props) {
  const [eachTitle, setEachTitle] = useState(props.todo.title)
  const [eachDesc, setEachDesc] = useState(props.todo.description)
  const [isNewUpdate, setIsNewUpdate] = useState(false)

  useEffect(() => {
    setEachTitle(props.todo.title)
    setEachDesc(props.todo.description)

  }, [props])

  useEffect(() => {
    console.log('value in input', eachTitle, eachDesc)
  },[eachTitle, eachDesc])

  const deleteTodoHandler = (title) => {
    axios
      .delete(`http://localhost:8000/api/todo/${title}`)
      .then(
        (res) => {
          console.log(res.data)
          setEachTitle('');
          setEachDesc('')
        }
      )
      .catch((err) => console.log(err));
  }

  const updateTodo = (title1, desc1) => {
    axios
      .put(`http://localhost:8000/api/todo/${title1}`, {
        "title": title1,
        "description": desc1,
      })
      .then((res) =>
        console.log('sucess update! response data:', res.data),
        setIsNewUpdate(false)
      )
      .catch((err) => console.log('err in update', err));
  };

  

  return (  
    <>
    {
      eachTitle ?
      <div>
        {/* 삼항연산자로 isNewUpdate면 input UI 보여주고 아님 정보 보여주기 */}
        {isNewUpdate ?
            <div className="d-flex justify-content-between align-items-center pb-3">
              <div className="d-flex flex-column w-75">
                <input type="text" defaultValue={eachTitle} onChange={(e) =>setEachTitle(e.target.value)} />
                <input type="text" defaultValue={eachDesc} onChange={(e) =>setEachDesc(e.target.value)} /> 
              </div>
              <div >
                <button
                  className="btn btn-primary "
                  onClick={() => updateTodo(eachTitle, eachDesc)}
                >완료</button>
              </div>
              <hr></hr>
            </div>
              :
              <div>
                <span style={{ fontWeight: "bold, underline" }}>
                  {eachTitle} :
                </span>
                {eachDesc}
                <button
                  onClick={() => deleteTodoHandler(eachTitle)}
                  className="btn btn-outline-danger my-2 mx-2"
                  style={{ borderRadius: "50px" }}
                >
                  X
                </button>
                <button
                  onClick={() => setIsNewUpdate(true)}
                  className="btn btn-success mx-2 my-2"
                  style={{ borderRadius: "50px" }}
                >
                  수정
                </button>
                <hr></hr>
              </div>
        }
      </div>
      :
      null
    }
    </>
  );
    
}

export default TodoItem;
