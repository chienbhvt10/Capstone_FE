import { API_LOGIN } from '~/constants/api-path';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  password: string;
  department: string;
}

export const login = async (params: LoginParams) => {
  const url = API_LOGIN;
  return HttpClient.post<typeof params, CommonResponse<LoginResponse>>(
    url,
    params
  );
};
