
export interface ApiResponse<T> {
  status: number;

  data?: T | T[];
  message?: string;
}
