import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { API_SUBJECT } from '../constants/api-path';
import { Subject } from '~/modules/Setting/Subjects/util/type';

interface CreateSubjectParams {
  code: string;
  name: string;
  department: string;
}

interface UpdateSubjectParams {
  id: number;
  code: string;
  name: string;
  department: string;
}

export const createSubject = async (params: CreateSubjectParams) => {
  const url = API_SUBJECT;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateSubject = async (params: UpdateSubjectParams) => {
  const url = API_SUBJECT;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const deleteSubject = async (params: number) => {
  const url = API_SUBJECT + `\\${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};

export const getSubjects = async () => {
  const url = API_SUBJECT;
  return HttpClient.get<number, CommonResponse<Subject[]>>(url);
};

export const getSubject = async (params: number) => {
  const url = API_SUBJECT + `\\${params}`;
  return HttpClient.get<typeof params, CommonResponse>(url);
};
