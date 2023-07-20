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
  itsFirst?: boolean;
  itsLast?: boolean;
}

const Category = ({
  name,
  id,
  nodes,
  parentId,
  addCategory,
  editCategory,
  removeCategory,
  isInputView,
  removeView,
  itsFirst,
  itsLast,
}: PropsType) => {
  const [view, setView] = useState(false);

  const viewCategory = (isView: boolean) => {
    setView(isView);
  };

  const lastEl = nodes.length - 2;

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
        <div className="item">
          <SubCategory
            name={name}
            id={id}
            nodes={nodes}
            parentId={parentId}
            removeCategory={removeCategory}
            editCategory={editCategory}
            viewCategory={viewCategory}
            itsFirst={itsFirst}
            itsLast={itsLast}
          />

          {!!nodes.length && (
            <div className="categoryList">
              {nodes.map((c, index) => (
                <Category
                  key={c.id}
                  {...c}
                  addCategory={addCategory}
                  editCategory={editCategory}
                  removeCategory={removeCategory}
                  isInputView={view}
                  removeView={viewCategory}
                  itsFirst={index === 0}
                  itsLast={index === lastEl}
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
