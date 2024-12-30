import React, { useState } from "react";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://cdn.wallpaperhub.app/cloudcache/7/c/6/7/a/2/7c67a2074bdd4c4d9e568418b1c77b291cfe9d34.jpg"
  );

  const handleColorChange = (color) => {
    const colorToImageMap = {
      blue: "https://cdn.wallpaperhub.app/cloudcache/7/c/6/7/a/2/7c67a2074bdd4c4d9e568418b1c77b291cfe9d34.jpg",
      white:
        "https://cdn.wallpaperhub.app/cloudcache/a/3/b/6/3/4/a3b634151d59bfc45ab8eed3d9a074784580cbb4.jpg",
      green:
        "https://cdn.wallpaperhub.app/cloudcache/9/2/6/4/e/6/9264e612b57c1e56bd290d966ebf2976712fc402.jpg",
      orange:
        "https://cdn.wallpaperhub.app/cloudcache/5/9/7/f/f/f/597fff4bbe33a7d719b82765dacfe0def8961236.jpg",
      space:
        "https://cdn.wallpaperhub.app/cloudcache/9/7/a/9/8/7/97a987190bf5959f176fa1428b61125eb444b879.jpg",
    };

    setBackgroundImage(colorToImageMap[color] || backgroundImage);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar onColorChange={handleColorChange} />
      <div className="content">
        <TaskInput />
        <TaskList />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
