import { FormEvent, useState } from "react";
import "./InputSave.scss";
import Done from "../../assets/done2.svg";
import Delete from "../../assets/deleteWolverine.svg";

const InputSave = ({
  onSave,
  remove,
  defaultValue,
  id,
}: {
  onSave: (value: string) => void;
  remove: () => void;
  defaultValue: string;
  id: number;
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleClick = () => {
    onSave(value);
  };

  return (
    <div className="inputSave">
      <input
        className="input"
        autoFocus
        type="text"
        onChange={handleChange}
        value={value}
        placeholder="Category name"
      />
      <button className="button add" onClick={handleClick} disabled={!value}>
        <img className="logoButton" src={Done} alt="done" />
      </button>
      {id !== 1 && (
        <button className="button delete" onClick={remove}>
          <img className="logoButton" src={Delete} alt="delete" />
        </button>
      )}
    </div>
  );
};

export default InputSave;
