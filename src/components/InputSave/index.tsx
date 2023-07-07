import { FormEvent, useState } from "react";
import "./InputSave.scss";

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
      />
      <button className="button" onClick={handleClick} disabled={!value}>
        save
      </button>
      {id !== 1 && (
        <button className="button" onClick={remove}>
          -
        </button>
      )}
    </div>
  );
};

export default InputSave;
