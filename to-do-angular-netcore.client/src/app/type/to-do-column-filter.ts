export enum ToDoColumn {
    Title,
    Category,
}


export type ToDoColumnFilter = {
    title: string;
    sortColumn?: ToDoColumn;
    sortOrder: boolean;
};
