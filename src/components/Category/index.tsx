import { useState } from "react";
import { CategoryType } from "../../types/CategoryType";
import InputSave from "../InputSave";
import SubCategory from "../SubCategory";
import "./Category.scss";

interface PropsType extends CategoryType {
  addCategory: (name: string, id: number) => void;
  editCategory: (value: string, id: number) => void;
  removeCategory: (id: number) => void;
  isInputView: boolean;
  removeView?: (isView: boolean) => void;
}

const Category = ({
  name,
  id,
  nodes,
  addCategory,
  editCategory,
  removeCategory,
  isInputView,
  removeView,
}: PropsType) => {
  const [view, setView] = useState(false);

  const viewCategory = (isView: boolean) => {
    setView(isView);
  };

  if (!name && isInputView)
    return (
      <InputSave
        onSave={(value) => {
          addCategory(value, id);
          removeView && removeView(false);
        }}
        defaultValue={name}
        id={id}
        remove={() => removeView && removeView(false)}
      />
    );

  return (
    <div className="category">
      {name ? (
        <div className={"item"}>
          <SubCategory
            name={name}
            id={id}
            removeCategory={removeCategory}
            editCategory={editCategory}
            viewCategory={viewCategory}
          />
          {!!nodes.length && (
            <div className="categoryList">
              {nodes.map((c) => (
                <Category
                  key={c.id}
                  {...c}
                  addCategory={addCategory}
                  editCategory={editCategory}
                  removeCategory={removeCategory}
                  isInputView={view}
                  removeView={viewCategory}
                />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Category;
