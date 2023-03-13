export interface CommonResponse<D = any> {
  data: D | null;
  message: string;
  isSuccess: boolean;
}
