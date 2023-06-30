import { useEffect, useState } from "react";

// let defaultValues: Category[] = [
//   { id: 0, name: "name", parentId: null, childrenIds: [], nodes: [] },
// ];

export interface CategoryType {
  name: string;
  id: number;
  parentId: number | null;
  childrenIds: number[];
  nodes: CategoryType[];
}

const useCategories = () => {
  // const [c, setC] = useState<CategoryType[]>([]);

  const [categoryArray, setCategoryArray] = useState<CategoryType[]>([
    // { id: 0, name: "name", parentId: null, childrenIds: [], nodes: [] },
  ]);

  const [categoryGraph, setCategoryGraph] = useState([]);

  // console.log(categoryArray);
  // console.log(categoryGraph);

  useEffect(() => {
    if (categoryArray.length) {
      const root = fillElNodes(categoryArray, categoryArray[0]);
      const graphArray = compareGraph(root);

      // @ts-ignore
      setCategoryGraph([graphArray]);
    }
  }, [categoryArray]);

  //   useEffect(() => setC(defaultValues), [defaultValues])

  // @ts-ignore

  const getNodeForId = (arr, id) => arr.find((el) => el.id === id);

  const fillElNodes = (arr: CategoryType[], el: CategoryType) => {
    if (!el.childrenIds.length) return el;

    return { ...el, nodes: el.childrenIds.map((id) => getNodeForId(arr, id)) };
  };

  // @ts-ignore

  const compareGraph = (el: CategoryType) => {
    const res = el.nodes.map((node) => fillElNodes(categoryArray, node));

    if (el.childrenIds.length > 0) {
      return { ...el, nodes: res.map((pi) => compareGraph(pi)) };
    }

    return { ...el, nodes: res };
  };

  const addCategory = (categoryName: string, parentId: number) => {
    const id = Math.random();

    const oldCategories = [...categoryArray];

    oldCategories.push({
      name: categoryName,
      id: id,
      parentId,
      nodes: [],
      childrenIds: [],
    });

    // @ts-ignore

    setCategoryArray(
      // @ts-ignore

      oldCategories.map((c) => {
        if (c.id === parentId) {
          return { ...c, childrenIds: [...c.childrenIds, id] };
        }

        return c;
      })
    );
  };

  const removeCategory = (categoryId: number) => {
    const res = categoryArray.filter(
      (c) => !(c.id === categoryId || c.parentId === categoryId)
    );

    return res.map((c) =>
      // @ts-ignore
      c.childrenIds?.includes(categoryId)
        ? { ...c, childrenIds: c.childrenIds.filter((id) => categoryId === id) }
        : c
    );
  };

  const editCategory = (categoryId: number, value: string) =>
    categoryArray.map((c) => (c.id === categoryId ? { ...c, name: value } : c));

  //   defaultValues = addCategory(defaultValues, "lol", 0);
  //   defaultValues = addCategory(defaultValues, "kek", 0);
  //   defaultValues = addCategory(defaultValues, "lol1", 1);
  //   defaultValues = addCategory(defaultValues, "kek1", 1);
  //   defaultValues = addCategory(defaultValues, "kek3", 2);
  //   defaultValues = addCategory(defaultValues, "kek4", 4);

  //   defaultValues = removeCategory(defaultValues, 5)
  // console.log(defaultValues)

  return { categoryGraph, addCategory, removeCategory, editCategory };
};
export default useCategories;
