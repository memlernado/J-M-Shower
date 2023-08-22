import { useEffect, useState } from "react";
import { itemsServices } from "../appwrite";
import { TItemDocument } from "../types";
import { v4 as uuidv4 } from "uuid";

export function Item() {
  const [i, setI] = useState("");
  const [things, setThings] = useState<TItemDocument[]>([]);
  useEffect(() => {
    itemsServices.listItems().then((res) => {
      setThings(res);
    });
  }, []);
  // const filteredThings = useMemo(
  //   () => things.filter((t) => t.Name.includes(q)),
  //   [q]
  // );
  const addItem = () => {
    const $id = uuidv4();
    const newItem = {
      name: i,
      isSelected: false,
    };
    itemsServices.newItem($id, newItem);
    setI("");
  };
  const deleteItem = (id: string) => {
    itemsServices.deleteItem(id);
  };
  console.log(things);
  return (
    <div id="itemsPage">
      <div id="inputsField">
        <input type="text" value={i} onChange={(e) => setI(e.target.value)} />
        <button onClick={addItem}>Add</button>
        <input type="text" />
        <button>🔍</button>
      </div>
      <ul>
        {things.map((t) => (
          <div id="newItem">
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
