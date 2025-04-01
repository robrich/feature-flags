export interface ApiResponse<T> {
  status?: number;
  error?: Error | undefined;
  loading: boolean;
  data?: T
}
