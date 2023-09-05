import { useEffect, useState } from "react";
import { itemsServices } from "../appwrite";
import { TItemDocument } from "../types";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as Sun } from "../assets/sun.svg";
import { ReactComponent as AddItemIcon } from "../assets/plus-square.svg";
import { ReactComponent as TitleIcon } from "../assets/Profile.svg";
import { ReactComponent as TitleIcon2 } from "../assets/Profile (1).svg";
import { Item } from "./item";

export function Items() {
  const [input, setInput] = useState("");
  const [things, setThings] = useState<Partial<TItemDocument>[]>([]);
  const [edit, setEdit] = useState(false);

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
    const localUpdate = () => {
      const newArray = things.filter((i) => i.$id !== t.$id);
      const index = things.findIndex((i) => i.$id === t.$id);
      if (index !== -1) newArray.splice(index, 0, t);
      setThings(newArray);
    };
    localUpdate();

    if (t.$id && t.name)
      try {
        console.log("Funciona,AQUI ESTOY ");
        itemsServices.updateItem(t.$id, {
          name: t.name,
          isSelected: t.isSelected || false,
        });
        console.log(t.isSelected);
      } catch (e) {
        console.log("Error, Intenta de nuevo", e);
        localUpdate();
      }
    else console.log("No encunetor o Id o Name Name:", t.name);
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
      <Sun className="sunIcon" />
      <div className="title">
        <TitleIcon className="elipse1" />
        <TitleIcon2 className="elipse2" />
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
          ></Item>
        ))}
      </ul>
    </div>
  );
}
// <li
//   key={t.$id}
//   className={`newItem   ${t.isSelected ? "checked" : "notChecked"}`}
// >
//   <p className="heading6 itemName">{t.name}</p>
//   {t.isSelected ? (
//     <TrashIcon
//       onClick={() => {
//         if (t.$id) deleteItem(t.$id);
//       }}
//     />
//   ) : (
//     <EditIcon
//       onClick={() => {
//         setEdit(true);
//       }}
//     />
//   )}

//   {t.isSelected ? (
//     <CheckSquareIcon
//       onClick={() => {
//         updateItem({
//           ...t,
//           isSelected: !t.isSelected,
//         });
//       }}
//     />
//   ) : (
//     <CheckIcon
//       onClick={() => {
//         updateItem({
//           ...t,
//           isSelected: !t.isSelected,
//         });
//       }}
//     />
//   )}
//   <hr className="line"></hr>
//   {edit && (
//     <input
//       type="text"
//       maxLength={50}
//       value={input}
//       onChange={(e) => {
//         t.name = e.target.value;
//       }}
//       className="heading6"
//     />
//   )}
// </li>
