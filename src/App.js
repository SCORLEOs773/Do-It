import React from "react";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
