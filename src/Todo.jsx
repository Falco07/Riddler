/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./todo.module.css"
import { useNavigate } from "react-router-dom";





const Todo = ({todo}) => {

const [isEditing, setIsEditing] = useState(false)
const [value , setValue] = useState("")


const handleDelete = (e) => {
     e.preventDefault();
     e.stopEventPropagation();
    console.log("deleting")
}

const navigate = useNavigate();


  
if(isEditing) {
    return (
      <div className={styles.todo_isEditing}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="button">Save</button>
      </div>
    );
}




  return (
    <div className={styles.todo} >
      <p>{todo?.title}</p>
      <div className={styles.button_group}>
        <button type="button" className="edit" onClick={() =>setIsEditing(true)}>
          ✏️
        </button>
        <button type="button" className="delete" onClick={ handleDelete}>
          ❌
        </button>
      </div>
    </div>
  );
}

export default Todo




    //  {
    //    isEditing === index ? (
    //      <>
    //        <input
    //          type="text"
    //          value={editText}
    //          onChange={(e) => setEditText(e.target.value)}
    //          className="edit-input"
    //        />
    //        <button className="save" onClick={() => handleSave(index)}>
    //          Save
    //        </button>
    //      </>
    //    ) : (
    //      <>
    //        <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
    //        <div className="function">
    //         
    //        </div>
    //      </>
    //    );
    //  }