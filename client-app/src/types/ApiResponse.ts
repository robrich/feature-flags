export interface ApiResponse<T> {
  status?: number;
  error?: string | undefined;
  loading: boolean;
  data?: T
}
