import { API_GET_ALL_CLASSES } from '~/constants/api-path';
import { Class } from '~/modules/Arrange/utils/type';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

export const createClass = async () => {};
export const updateClass = async () => {};
export const registerClass = async () => {};

export const getClasses = async () => {
  const url = API_GET_ALL_CLASSES;
  return HttpClient.get<number, CommonResponse<Class[]>>(url);
};

export const getClass = async () => {};
