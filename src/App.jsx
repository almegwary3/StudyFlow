import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State
  const [input, setInput] = useState("");

  const [Task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(Task));
  }, [Task]);

  // Delete Task
  function handleDelete(id) {
    setTask(Task.filter((task) => task.id !== id));
  }

  // Complete Task
  function handleComplete(id) {
    setTask(
      Task.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        }

        return task;
      }),
    );
  }

  // Add Task
  function addTask(event) {
    event.preventDefault();

    if (input.trim() === "") {
      return;
    }

    const NewTask = {
      id: crypto.randomUUID(),
      name: input.trim(),
      completed: false,
    };

    setTask([...Task, NewTask]);
    setInput("");
  }

  // Task Counters
  const totalComplete = Task.filter((task) => task.completed === true).length;

  const RE = Task.filter((task) => task.completed === false).length;

  // Display Tasks
  const AddTaskList = Task.map((task) => {
    return (
      <li key={task.id} className="li">
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.name}
        </span>

        <button
          className="Complete"
          onClick={() => handleComplete(task.id)}
          disabled={task.completed}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>

        <button className="Delete" onClick={() => handleDelete(task.id)}>
          Delete
        </button>
      </li>
    );
  });

  // UI
  return (
    <>
      <div className="essential">
        <div>
          <h3>StudyFlow</h3>

          <div className="stat">{Task.length} Total</div>
          <div className="stat">{RE} Remaining</div>
          <div className="stat">{totalComplete} Completed</div>

          <h5>Welcome back!</h5>
          <p>Organize your study, one task at a time.</p>
        </div>

        <form className="essential2" onSubmit={addTask}>
          <label htmlFor="task">New task</label>

          <input
            id="task"
            name="task"
            placeholder="Enter your study task..."
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        <ul>{AddTaskList}</ul>
      </div>
    </>
  );
}

export default App;
