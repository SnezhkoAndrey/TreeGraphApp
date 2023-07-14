import { useState } from "react";
import InputSave from "../InputSave";
import "./SubCategory.scss";
import Plus from "../../assets/plus2.svg";
import Delete from "../../assets/deleteWolverine.svg";
import Edit from "../../assets/editPencil2.svg";

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
      <button className="button add" onClick={() => viewCategory(true)}>
        <img className="logoButton" src={Plus} alt="plus" />
      </button>
      <button className="button edit" onClick={() => setEditMode(true)}>
        <img className="logoButton" src={Edit} alt="edit" />
      </button>
      <button className="button delete" onClick={() => removeCategory(id)}>
        <img className="logoButton" src={Delete} alt="delete" />
      </button>
    </div>
  );
};

export default SubCategory;
