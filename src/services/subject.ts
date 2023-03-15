import { API_GET_ALL_SUBJECT } from '~/constants/api-path';
import { Subject } from '~/modules/Setting/Subjects/util/type';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

export const createSubject = async () => {};
export const updateSubject = async () => {};
export const registerSubject = async () => {};

export const getSubjects = async () => {
  const url = API_GET_ALL_SUBJECT;
  return HttpClient.get<number, CommonResponse<Subject[]>>(url);
};

export const getSubject = async () => {};
