import {
  API_CREATE_EXECUTE_INFO,
  API_GET_ALL_EXECUTE_INFO,
} from '~/constants/api-path';
import { ExecuteInfo } from '~/modules/Arrange/utils/type';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { GetAllParams } from '~/utils/types';

export const getExecuteInfos = async (params: GetAllParams) => {
  const url = API_GET_ALL_EXECUTE_INFO + `/get`;
  return HttpClient.post<typeof params, CommonResponse<ExecuteInfo[]>>(url);
};

export const createExecuteInfos = async (params: ExecuteInfo) => {
  const url = API_CREATE_EXECUTE_INFO;
  return HttpClient.post<ExecuteInfo, CommonResponse>(url, params);
};
