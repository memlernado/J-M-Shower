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

    itemsServices.newItem($id, newItem);
    setInput("");
  };
  const updateItem = (t: Partial<TItemDocument>) => {
    t.isSelected = !t.isSelected!;
    const newArray = things.filter((i) => i.$id !== t.$id);
    const index = things.findIndex((i) => i.$id === t.$id);
    newArray.splice(index, 0, t);
    setThings([...newArray]);
    if (t.$id && t.name)
      itemsServices.updateItem(t.$id, {
        name: t.name,
        isSelected: t.isSelected,
      });
  };
  const deleteItem = (id: string) => {
    itemsServices.deleteItem(id);
    const newArray = things.filter((i) => i.$id !== id);
    setThings(newArray);
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
          <div className={`newItem ${t.isSelected ? "checked" : "notChecked"}`}>
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
                console.log(t);
                console.log(t.$id);
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
