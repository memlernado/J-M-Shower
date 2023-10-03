import "./App.css";
import { Items } from "./components/items";
import { useEffect, useState } from "react";
import { ReactComponent as Sun } from "./assets/sun.svg";
import { ReactComponent as Moon } from "./assets/moon.svg";
import { ReactComponent as Icon } from "./assets/undraw_completed_tasks.svg";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div>
      {darkMode ? (
        <Moon
          className="modeIcon"
          onClick={() => {
            document.body.classList.add("ligthMode");
            document.body.classList.remove("darkMode");
            setDarkMode(false);
          }}
        />
      ) : (
        <Sun
          className="modeIcon"
          onClick={() => {
            document.body.classList.add("darkMode");
            document.body.classList.remove("ligthMode");
            setDarkMode(true);
          }}
        />
      )}
      <Items />
      <Icon className="taskIcon" />
    </div>
  );
}

export default App;
