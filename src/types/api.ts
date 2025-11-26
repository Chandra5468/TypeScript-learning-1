export type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  message?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};
