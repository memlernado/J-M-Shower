import "./App.css";
import { Items } from "./components/items";
import { ReactComponent as Icon } from "./assets/undraw_completed_tasks.svg";

function App() {
  return (
    <div>
      <Items />
      <Icon className="taskIcon" />
    </div>
  );
}

export default App;
