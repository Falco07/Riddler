import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const todosPerPage = 20;

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

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {paginatedTodos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span> Page {page} </span>
        <button
          disabled={page * todosPerPage >= filteredTodos.length}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;