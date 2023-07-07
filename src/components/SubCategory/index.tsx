import { useState } from "react";
import InputSave from "../InputSave";
import "./SubCategory.scss";

const SubCategory = ({
  name,
  id,
  removeCategory,
  editCategory,
  viewCategory,
}: {
  name: string;
  id: number;
  removeCategory: (id: number) => void;
  editCategory: (value: string, id: number) => void;
  viewCategory: (isView: boolean) => void;
}) => {
  const [editMode, setEditMode] = useState(false);

  if (editMode)
    return (
      <InputSave
        onSave={(value) => {
          editCategory(value, id);
          setEditMode(false);
        }}
        defaultValue={name}
        id={id}
        remove={() => setEditMode(false)}
      />
    );

  return (
    <div className="subCategory">
      <h3 className="title">{name}</h3>
      <button className="button" onClick={() => viewCategory(true)}>
        +
      </button>
      <button className="button" onClick={() => removeCategory(id)}>
        -
      </button>
      <button className="button" onClick={() => setEditMode(true)}>
        /
      </button>
    </div>
  );
};

export default SubCategory;
