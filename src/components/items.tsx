import { useEffect, useState } from "react";
import { itemsServices } from "../appwrite";
import { TItemDocument } from "../types";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as AddItemIcon } from "../assets/plus-square.svg";
import { ReactComponent as TitleIcon } from "../assets/Profile.svg";
import { ReactComponent as TitleIcon2 } from "../assets/Profile (1).svg";
import { Item } from "./item";

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
    const oldItem = things.find((i) => {
      i.$id === t.$id;
    });
    const newArray = things.filter((i) => i.$id !== t.$id);
    const index = things.findIndex((i) => i.$id === t.$id);
    if (index !== -1) newArray.splice(index, 0, t);
    setThings(newArray);

    if (t.$id && t.name)
      try {
        itemsServices.updateItem(t.$id, {
          name: t.name,
          isSelected: t.isSelected || false,
        });
      } catch (e) {
        console.log("Error, Intenta de nuevo", e);
        const newArray = things.filter((i) => i.$id !== t.$id);
        const index = things.findIndex((i) => i.$id === t.$id);
        if (index !== -1 && oldItem) newArray.splice(index, 0, oldItem);
        setThings(newArray);
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
      <div className="title">
        <TitleIcon className="elipse1" />
        <TitleIcon2 className="elipse2" />
        <h1 className="titleText">MariaApp</h1>
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
          maxLength={50}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="heading6"
          placeholder="Add a new task"
          required
        />
        <button type="submit" className="deleteButtonStyle">
          <AddItemIcon />
        </button>
        <hr className="line"></hr>
      </form>

      <ul>
        {things.map((t) => (
          <Item
            deleteItem={() => {
              if (t.$id) deleteItem(t.$id);
            }}
            updateItem={(t) => {
              updateItem(t);
            }}
            t={t}
            key={t.$id}
          />
        ))}
      </ul>
    </div>
  );
}
