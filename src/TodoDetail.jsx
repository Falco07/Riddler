import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => setTodo(response.data))
      .catch((error) => console.error("Error fetching todo details:", error));
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h1>Todo Details</h1>
      <h2>{todo.title}</h2>
      <p>ID: {todo.id}</p>
      <p>Status: {todo.completed ? "Completed" : "Incomplete"}</p>
    </div>
  );
};

export default TodoDetails;
