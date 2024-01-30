export type Pagination = {
    page: number;
    total: number;
}


export type PaginationResponse<T> = Pagination & {
    data: T[];
};

