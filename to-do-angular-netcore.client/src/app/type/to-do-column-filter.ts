export enum ToDoColumn {
  Title,
  Category,
  Done,
}


export type ToDoColumnFilter = {
  title: string;
  sortColumn?: ToDoColumn;
  sortOrder: boolean;
};
