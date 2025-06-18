export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
  message?: string;
}
