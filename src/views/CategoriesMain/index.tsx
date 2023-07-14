import "./CategoriesMain.scss";
import useCategories from "../../hooks/useCategories";
import Category from "../../components/Category";

interface PropsType {
  legacyRef: (elem: HTMLDivElement | null) => void;
  zoomContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const CategoriesMain = ({ legacyRef, zoomContainerRef }: PropsType) => {
  const { addCategory, categoryGraph, editCategory, removeCategory } =
    useCategories();

  if (!categoryGraph.length) return null;

  return (
    <div ref={zoomContainerRef}>
      <div className="categoryMain" ref={legacyRef}>
        <Category
          addCategory={addCategory}
          editCategory={editCategory}
          removeCategory={removeCategory}
          isInputView={true}
          {...categoryGraph[0]}
        />
      </div>
    </div>
  );
};

export default CategoriesMain;
