import { FormEvent, useEffect, useState } from "react";
import "./CategoriesMain.scss";
import useCategories, { CategoryType } from "../../hooks/useCategories";

const CategoriesMain = () => {
  const { addCategory, categoryGraph, editCategory, removeCategory } =
    useCategories();

  return (
    <div className="subCategoryList">
      <SubCategory
        items={categoryGraph}
        addCategory={addCategory}
        parentId={null}
        editCategory={editCategory}
        removeCategory={removeCategory}
      />
    </div>
  );
};

type PropsType = {
  items: CategoryType[];
  parentId: number | null;
  addCategory: any;
  editCategory: any;
  removeCategory: any;
};

const SubCategory = ({
  items,
  addCategory,
  parentId,
  editCategory,
  removeCategory,
}: PropsType) => {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(true);
  const [categories, setCategories] = useState(items);

  useEffect(() => {
    setCategories(items);
  }, [items]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleAddNewCategory = () => {
    const newCategory = categories.map((c) => {
      return {
        ...c,
        nodes: [
          ...c.nodes,
          {
            id: Math.random(),
            childrenIds: [],
            name: "",
            nodes: [],
            parentId: c.id,
          },
        ],
      };
    });
    setCategories(newCategory);
  };

  console.log(categories);
  console.log("parentId :>> ", parentId);

  return isEdit ? (
    <div>
      <input autoFocus type="text" onChange={handleChange} />
      <button
        onClick={() => {
          addCategory(value, parentId);
          setIsEdit(false);
        }}
      >
        save
      </button>
    </div>
  ) : (
    <>
      {categories.map((n) => (
        <div key={n.id}>
          <h3>{n.name}</h3>
          <button onClick={handleAddNewCategory}>+</button>
          <button onClick={() => removeCategory(n.id)}>-</button>
          {/* <button onClick={()=>editCategory()}>/</button> */}
          {n.nodes && n.nodes.length ? (
            <SubCategory
              items={n.nodes}
              parentId={n.id}
              addCategory={addCategory}
              editCategory={editCategory}
              removeCategory={removeCategory}
            />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default CategoriesMain;
