import { useState } from "react";
import { TItemDocument } from "../types";
import { ReactComponent as SquareIcon } from "../assets/square.svg";
import { ReactComponent as CheckSquareIcon } from "../assets/check-square.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as TrashIcon } from "../assets/trash-2.svg";
import { ReactComponent as CheckIcon } from "../assets/check.svg";

type ItemProps = {
  deleteItem: (id: string) => void;
  updateItem: (t: Partial<TItemDocument>) => void;
  t: Partial<TItemDocument>;
};

export function Item({ deleteItem, updateItem, t }: ItemProps) {
  const [input, setInput] = useState(() => t.name ?? "");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className={`newItem   ${t.isSelected ? "checked" : "notChecked"}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateItem(t);
            setIsEditing(false);
          }}
        >
          {isEditing ? (
            <input
              required
              type="text"
              maxLength={50}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                t.name = e.target.value;
              }}
              placeholder={t.name}
              className="heading6 itemName"
              onClick={() => {
                if (t.name) setInput(t.name);
              }}
            />
          ) : (
            <p
              className="heading6 itemName"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              {t.name}
            </p>
          )}
          {t.isSelected ? (
            <TrashIcon
              onClick={() => {
                if (t.$id) deleteItem(t.$id);
              }}
            />
          ) : isEditing ? (
            <button type="submit" className="deleteButtonStyle">
              <CheckIcon />
            </button>
          ) : (
            <EditIcon
              onClick={() => {
                setIsEditing(true);
              }}
            />
          )}
        </form>
        {t.isSelected ? (
          <CheckSquareIcon
            onClick={() => {
              updateItem({
                ...t,
                isSelected: !t.isSelected,
              });
            }}
          />
        ) : (
          <SquareIcon
            onClick={() => {
              updateItem({
                ...t,
                isSelected: !t.isSelected,
              });
            }}
          />
        )}
        <hr className="line"></hr>
      </div>
    </div>
  );
}
