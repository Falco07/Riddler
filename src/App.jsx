import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import TodoDetail from "./TodoDetail";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
