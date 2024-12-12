import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Todo from "./Todo";

const TodoList = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [theme, seTheme] = useState("light")
  const todosPerPage = 20;

  const [isModalOpen, setModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, todos]);

  const paginatedTodos = filteredTodos.slice(
    (page - 1) * todosPerPage,
    page * todosPerPage
  );
  
 
 
  const handleEdit = (index) => {
    setIsEditing(index);
    setEditText(todos[index]);
  };

  const handleSave = (index) => {
    const newTodos = [...todos];
    newTodos[index] = editText;
    setTodos(newTodos);
    setIsEditing(null);
    setEditText("");
  };


  const handleDelete = (item) => {
    const updatedTodos = todos.filter((_, i) => i !== item);
    setTodos(updatedTodos);
  };
  const handleCreateTodo = () => {
    const newId = todos.length + 1; // Generate a new ID
    const newTodoItem = { id: newId, title: newTodo, completed: false };
    setTodos((prevTodos) => [newTodoItem, ...prevTodos]); // Add to the beginning of the list
    setNewTodo("");
    setModalOpen(false);
  };



  useEffect(() => {
    switch (theme) {
      case "light": {
        if (document?.body) {
          document.body.classList.remove("light", "dark");
          document.body.classList.add("light");
        }

        break;
      }
      case "dark": {
        if (document?.body) {
          document.body.classList.remove("light", "dark");
          document.body.classList.add("dark");
        }

        break;
      }
      default: {
        //
      }
    }
  }, [theme]);


return (
  <div className="list">
    <button type="button" onClick={() => seTheme(theme === "light" ? "dark" : "light")}>dark mode</button>
    <h1 className="header">A Todo List Application created by Elo</h1>
    <input
      type="text"
      placeholder="Search todos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="searchInput"
    />
    <div style={{display:"felx",flexDirection:"column",gap: "10px"}} >
      {paginatedTodos.map((todo, index) => (
        <Todo todo={todo} key={todo.id}/>
      ))}
    </div>
    <div>
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className="page_but"
      >
        Previous
      </button>
      <span className="page"> Page {page} </span>
      <button
        disabled={page * todosPerPage >= filteredTodos.length}
        onClick={() => setPage((prev) => prev + 1)}
        className="page_but"
      >
        Next
      </button>
    </div>
    <button onClick={() => setModalOpen(true)} className="new-todo-button">
        ➕
      </button>
    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal_header">Create New Todo</h2>
            <input
              type="text"
              placeholder="Enter todo title..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="new-todo-input"
              required
            />
            <button onClick={handleCreateTodo} className="create-button">
              Create
            </button>
            <button onClick={() => setModalOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
  </div>
);
}
export default TodoList;
