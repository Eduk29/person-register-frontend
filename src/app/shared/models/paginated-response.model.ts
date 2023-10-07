export interface IPaginatedResponse<T> {
  content?: Array<T>;
  pageNumber?: number;
  pageSize?: number;
  timestamp?: string;
  totalElements?: number;
  totalPages?: number;
}
