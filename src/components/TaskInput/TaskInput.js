import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasksSlice";
import "./TaskInput.css";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  return (
    <div
      className="task-input-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          className="task-input"
        />
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
      <span
        className="help-text"
        style={{ marginLeft: "-400px", marginTop: "5px", color: "#777" }}
      >
        *Click on the task to edit
      </span>
    </div>
  );
};

export default TaskInput;
