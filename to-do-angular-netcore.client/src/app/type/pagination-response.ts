export type PaginationResponse<T> = {
  page: number;
  total: number;
  data: T[];
};
