import { FormEvent, useState } from "react";
import "./Category.scss";

interface PropsType {
  id: number;
  removeCategory: (id: number) => void;
}

const Category = ({ id, removeCategory }: PropsType) => {
  const [categoryList, setCategoryList] = useState([] as any);
  const [categoryName, setCategoryName] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const removeSubcategory = (id: number) => {
    setCategoryList([...categoryList.filter((cat: any) => cat.id !== id)]);
  };

  const addCategory = () => {
    setCategoryList(
      categoryList.concat(
        <Category
          key={Math.random()}
          id={Math.random()}
          removeCategory={removeSubcategory}
        />
      )
    );
  };

  const deleteCategory = () => {
    removeCategory(id);
  };

  return categoryName ? (
    <div className="categoryName">
      <input autoFocus type="text" value={value} onChange={handleChange} />
      <button className="button">
        <div className="valueButton" onClick={() => setCategoryName(false)}>
          +
        </div>
      </button>
      <button className="button">
        <div className="valueButton" onClick={deleteCategory}>
          x
        </div>
      </button>
    </div>
  ) : (
    <div>
      <div className="category">
        <div className="title">{value ? value : "Category"}</div>
        <button className="button" onClick={addCategory}>
          <div className="valueButton">+</div>
        </button>
        <button className="button" onClick={() => setCategoryName(true)}>
          <div className="valueButton">/</div>
        </button>
        <button className="button">
          <div className="valueButton" onClick={deleteCategory}>
            x
          </div>
        </button>
      </div>
      <div className="subCategoryList">{categoryList}</div>
    </div>
  );
};

export default Category;
