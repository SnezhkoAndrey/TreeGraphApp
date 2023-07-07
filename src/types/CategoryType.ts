export interface CategoryType {
  name: string;
  id: number;
  parentId: number;
  childrenIds: number[];
  nodes: CategoryType[];
}
