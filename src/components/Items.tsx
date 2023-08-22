import { useEffect, useState } from "react";
import { itemsServices } from "../appwrite";
import { TItemDocument } from "../types";
import { v4 as uuidv4 } from "uuid";

export function Items() {
  const [input, setInput] = useState("");
  const [things, setThings] = useState<TItemDocument[]>([]);
  useEffect(() => {
    itemsServices.listItems().then((res) => {
      setThings(res);
    });
  }, []);
  const addItem = () => {
    const $id = uuidv4();
    const newItem = {
      name: input,
      isSelected: false,
    };
    itemsServices.newItem($id, newItem);
    setInput("");
  };
  const deleteItem = (id: string) => {
    itemsServices.deleteItem(id);
  };
  console.log(things);
  return (
    <div className="itemsPage">
      <div className="inputsField">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {things.map((t) => (
          <div className="newItem">
            <input type="checkbox" id="isSelected" />
            <li>{t.name}</li>
            <button
              onClick={() => {
                deleteItem(t.$id);
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
