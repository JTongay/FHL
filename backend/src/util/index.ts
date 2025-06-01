export type Nullable<T> = T | null;

export interface Input<T> {
  input: T;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export class PaginatedResponse<T> {
  limit: number;
  offset: number;
  total: number;
  data: T[];

  constructor(paginationParams: Pagination, total: number, data: T[]) {
    this.limit = paginationParams.limit;
    this.offset = paginationParams.offset;
    this.total = total;
    this.data = data;
  }
}

export enum Order {
  ASC = "asc",
  DESC = "desc",
}
