import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { addTask } from "../../redux/tasksSlice";
import { toast } from "react-toastify";
import "./TaskInput.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask(task));
      toast.success("Task added successfully!");
      setTask("");
    } else {
      toast.error("Task cannot be empty!");
    }
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  const tasks = useSelector((state) => state.tasks);
  const totalTasks = tasks.length;
  const importantTasks = tasks.filter((task) => task.important).length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const data = {
    labels: ["Completed", "Important", "Pending"],
    datasets: [
      {
        label: "Task Statistics",
        data: [completedTasks, importantTasks, pendingTasks],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#ffa726", "#e57373"],
      },
    ],
  };

  return (
    <div className="main">
      <div className="task-input-container">
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
        <span className="help-text">*Click on the task to edit</span>
      </div>

      <div className="task-tracker-drawer">
        <div className="chart-legend">
          <h3>Task Tracker</h3>
          <Doughnut data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
