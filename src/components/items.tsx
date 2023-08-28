import { useEffect, useState } from "react";
import { itemsServices } from "../appwrite";
import { TItemDocument } from "../types";
import { v4 as uuidv4 } from "uuid";

export function Items() {
  const [input, setInput] = useState("");
  const [things, setThings] = useState<Partial<TItemDocument>[]>([]);

  const fetchItems = () =>
    itemsServices.listItems().then((res) => {
      setThings(res);
    });
  useEffect(() => {
    fetchItems();
  }, []);
  const addItem = () => {
    const $id = uuidv4();
    const newItem = {
      name: input,
      isSelected: false,
    };
    setThings((prev) => [...prev, { $id, ...newItem }]);

    try {
      itemsServices.newItem($id, newItem);
      setInput("");
    } catch (e) {
      const newArray = things.filter((i) => i.$id !== $id);
      setThings(newArray);
      console.log("Error, Intenta de nuevo", e);
    }
  };
  const updateItem = (t: Partial<TItemDocument>) => {
    t.isSelected = !t.isSelected!;
    const localUpdate = () => {
      const newArray = things.filter((i) => i.$id !== t.$id);
      const index = things.findIndex((i) => i.$id === t.$id);
      if (index !== -1) newArray.splice(index, 0, t);
      setThings([newArray]);
    };

    if (t.$id && t.name)
      try {
        itemsServices.updateItem(t.$id, {
          name: t.name,
          isSelected: t.isSelected,
        });
      } catch (e) {
        console.log("Error, Intenta de nuevo", e);
        t.isSelected = !t.isSelected!;
        localUpdate();
      }
  };
  const deleteItem = (id: string) => {
    try {
      itemsServices.deleteItem(id);
      const newArray = things.filter((i) => i.$id !== id);
      setThings(newArray);
    } catch (e) {
      console.log("Error, no pudo ser eliminado -> Intente nuevamente");
    }
  };
  return (
    <div className="itemsPage">
      <div>
        <div className="title">
          <h1>Maria's List</h1>
        </div>
        <form
          className="inputsField"
          onSubmit={(e) => {
            e.preventDefault();
            addItem();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <ul>
        {things.map((t) => (
          <div
            key={t.$id}
            className={`newItem ${t.isSelected ? "checked" : "notChecked"}`}
          >
            <button
              onClick={() => {
                updateItem(t);
              }}
            >
              ✔
            </button>

            <li>{t.name}</li>
            <button
              onClick={() => {
                if (t.$id) deleteItem(t.$id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
