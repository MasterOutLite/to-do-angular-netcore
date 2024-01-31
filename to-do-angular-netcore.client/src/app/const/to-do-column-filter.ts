import {ToDoColumn, ToDoColumnFilter} from "../type/to-do-column-filter";

export const toDoColumnFilter: ToDoColumnFilter[] = [
  {
    title: 'Asc',
    sortOrder: true,
  },
  {
    title: 'Desc',
    sortOrder: false,
  },
  {
    title: 'Title asc',
    sortColumn: ToDoColumn.Title,
    sortOrder: true,
  },
  {
    title: 'Title desc',
    sortColumn: ToDoColumn.Title,
    sortOrder: false,
  }, {
    title: 'Category asc',
    sortColumn: ToDoColumn.Category,
    sortOrder: true,
  }, {
    title: 'Category desc',
    sortColumn: ToDoColumn.Category,
    sortOrder: false,
  }, {
    title: 'Done asc',
    sortColumn: ToDoColumn.Done,
    sortOrder: true,
  }, {
    title: 'Done desc',
    sortColumn: ToDoColumn.Done,
    sortOrder: false,
  },
]

