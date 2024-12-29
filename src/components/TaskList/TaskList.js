import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleComplete,
  editTask,
  toggleImportant,
} from "../../redux/tasksSlice";
import { FaTrash, FaStar } from "react-icons/fa";
import "./TaskList.css";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [showCompleted, setShowCompleted] = useState(false);
  const [showImportant, setShowImportant] = useState(false);

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setNewText(task.text);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (newText.trim()) {
      dispatch(editTask({ id: taskToEdit.id, text: newText }));
      setIsEditing(false);
      setNewText("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (showCompleted && showImportant) {
      return task.completed && task.important;
    }
    if (showCompleted) {
      return task.completed;
    }
    if (showImportant) {
      return task.important;
    }
    return true;
  });

  return (
    <div className="task-list-wrapper">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${showCompleted ? "active" : ""}`}
          onClick={() => setShowCompleted((prev) => !prev)}
        >
          Show Completed
        </button>
        <button
          className={`filter-btn ${showImportant ? "active" : ""}`}
          onClick={() => setShowImportant((prev) => !prev)}
        >
          Show Important
        </button>
      </div>

      <div className="task-list-container">
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""} ${
                task.important ? "important" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className="task-checkbox"
              />
              <span className="task-text" onClick={() => handleEditClick(task)}>
                {task.text}
              </span>
              <button
                className={`star-btn ${task.important ? "active" : ""}`}
                onClick={() => dispatch(toggleImportant(task.id))}
              >
                <FaStar />
              </button>
              <button
                className="delete-btn"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Task Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="edit-input"
            />
            <div className="modal-buttons">
              <button onClick={handleSaveEdit} className="save-btn">
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewText("");
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
