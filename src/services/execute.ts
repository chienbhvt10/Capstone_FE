import {
  API_CREATE_EXECUTE_INFO,
  API_GET_ALL_EXECUTE_INFO,
} from '~/constants/api-path';
import { ExecuteInfo } from '~/modules/Arrange/utils/type';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

export const getExecuteInfos = async () => {
  const url = API_GET_ALL_EXECUTE_INFO;
  return HttpClient.get<number, CommonResponse<ExecuteInfo[]>>(url);
};

export const createExecuteInfos = async (params: ExecuteInfo) => {
  const url = API_CREATE_EXECUTE_INFO;
  return HttpClient.post<ExecuteInfo, CommonResponse>(url, params);
};
