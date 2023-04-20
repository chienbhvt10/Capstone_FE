import { API_GET_ALL_CLASSES } from '~/constants/api-path';
import { Class } from '~/modules/Arrange/utils/type';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { GetAllParams } from '~/utils/types';

export const createClass = async () => {};
export const updateClass = async () => {};
export const registerClass = async () => {};

export const getClasses = async (params: GetAllParams) => {
  const url = API_GET_ALL_CLASSES;
  return HttpClient.post<typeof params, CommonResponse<Class[]>>(url, params);
};

export const getClass = async () => {};
