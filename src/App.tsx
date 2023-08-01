import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [q, setQ] = useState("");
  const [things, setThings] = useState([
    {
      nombre: "Olla a presion",
    },
    {
      nombre: "Cuchara de palo",
    },
    {
      nombre: "Cuchara de sopa",
    },
    {
      nombre: "colador",
    },
    {
      nombre: "vaso de vidrio",
    },
  ]);

  const filteredThings = useMemo(
    () => things.filter((t) => t.nombre.includes(q)),
    [q]
  );
  setThings([
    {
      nombre: "Olla a presion",
    },
    {
      nombre: "Cuchara de palo",
    },
    {
      nombre: "Cuchara de sopa",
    },
  ]);
  return (
    <div>
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul>
        {filteredThings.map((t) => (
          <li>{t.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
