import { useState } from "react";
import Category from "../../components/Category";
import "./CategoriesMain.scss";

const CategoriesMain = () => {
  const [categoryList, setCategoryList] = useState([] as any);

  const removeCategory = (id: number) => {
    setCategoryList([...categoryList.filter((cat: any) => cat.id !== id)]);
  };

  const addCategory = () => {
    setCategoryList(
      categoryList.concat(
        <Category
          key={Math.random()}
          id={Math.random()}
          removeCategory={removeCategory}
        />
      )
    );
  };

  return (
    <div>
      <div className="mainCategory">
        <div className="title">Category</div>
        <button className="addButton" onClick={addCategory}>
          <div className="valueButton">+</div>
        </button>
      </div>
      <div className="subCategoryList">{categoryList}</div>
    </div>
  );
};

export default CategoriesMain;
