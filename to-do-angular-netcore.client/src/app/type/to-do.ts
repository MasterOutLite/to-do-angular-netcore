import {Category} from "./category";

export type ToDo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
  categoryId: number;
  category: Category;
}
