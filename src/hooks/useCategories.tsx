import { useEffect, useState } from "react";
import { CategoryType } from "../types/CategoryType";

const defaultValues: CategoryType[] = [
  { id: 1, name: "", parentId: 0, childrenIds: [], nodes: [] },
];

const useCategories = () => {
  const [categoryArray, setCategoryArray] =
    useState<CategoryType[]>(defaultValues);

  const [categoryGraph, setCategoryGraph] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (categoryArray.length) {
      const root = fillElNodes(categoryArray, categoryArray[0]);
      const graphArray = compareGraph(root);

      setCategoryGraph([graphArray]);
    }
  }, [categoryArray]);

  const getNodeForId = (arr: CategoryType[], id: number) =>
    arr.find((el) => el.id === id) as CategoryType;

  const fillElNodes = (arr: CategoryType[], el: CategoryType) => {
    if (!el.childrenIds.length) return el;

    return { ...el, nodes: el.childrenIds.map((id) => getNodeForId(arr, id)) };
  };

  const compareGraph = (el: CategoryType): CategoryType => {
    const res: CategoryType[] = el.nodes.map((node) =>
      fillElNodes(categoryArray, node)
    );

    if (res.length > 0) {
      return {
        ...el,
        nodes: res.map((pi) => compareGraph(pi)),
      };
    }

    return { ...el, nodes: res };
  };

  const addCategory = (categoryName: string, id: number) => {
    const newId = Math.random();
    const newId2 = Math.random();

    const element = getNodeForId(categoryArray, id);

    const parentId = element.parentId;

    const oldCategories = categoryArray.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          name: categoryName,
          childrenIds: [...c.childrenIds, newId],
        };
      } else {
        return c;
      }
    });

    oldCategories.push({
      name: "",
      id: newId,
      parentId: id,
      nodes: [],
      childrenIds: [],
    });

    let result = oldCategories;

    if (parentId) {
      oldCategories.push({
        name: "",
        id: newId2,
        parentId,
        nodes: [],
        childrenIds: [],
      });

      result = oldCategories.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            childrenIds: [...c.childrenIds, newId2],
          };
        } else {
          return c;
        }
      });
    }

    setCategoryArray(result);
  };

  const filterCategory = (array: CategoryType[], ids: number[]) => {
    return array.filter((el) => !ids.includes(el.id));
  };

  const removeCategory = (categoryId: number) => {
    const element = getNodeForId(categoryArray, categoryId);

    const parentId = element.parentId;

    let arrayId: number[] = [];

    const findChild = (childId: number[]) => {
      if (childId.length) {
        arrayId = [...arrayId, ...childId];
        childId.map((id) => {
          const children = getNodeForId(categoryArray, id);
          findChild(children.childrenIds);
        });
      } else {
        return;
      }
    };

    findChild(element.childrenIds);

    const response = filterCategory(categoryArray, [...arrayId, categoryId]);

    if (response.length) {
      response.map((el) => {
        if (el.id === parentId) {
          const filterIds = el.childrenIds.filter((id) => id !== categoryId);
          el.childrenIds = filterIds;
          return el;
        } else {
          return el;
        }
      });
      setCategoryArray(response);
    } else {
      setCategoryArray(defaultValues);
    }
  };

  const editCategory = (value: string, categoryId: number) => {
    const result = categoryArray.map((c) =>
      c.id === categoryId ? { ...c, name: value } : c
    );
    setCategoryArray(result);
  };
  return {
    categoryGraph,
    addCategory,
    removeCategory,
    editCategory,
  };
};
export default useCategories;
