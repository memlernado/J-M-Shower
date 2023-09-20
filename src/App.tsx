import "./App.css";
import { Items } from "./components/items";
import { useState } from "react";
import { ReactComponent as Sun } from "./assets/sun.svg";
import { ReactComponent as Moon } from "./assets/moon.svg";
import { ReactComponent as Icon } from "./assets/undraw_completed_tasks.svg";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.add("darkMode");
      document.body.classList.remove("ligthMode");
    } else {
      document.body.classList.add("ligthMode");
      document.body.classList.remove("darkMode");
    }
  };
  return (
    <div>
      {darkMode ? (
        <Moon
          className="modeIcon"
          onClick={() => {
            changeDarkMode();
          }}
        />
      ) : (
        <Sun
          className="modeIcon"
          onClick={() => {
            changeDarkMode();
          }}
        />
      )}
      <Items />
      <Icon className="taskIcon" />
    </div>
  );
}

export default App;
