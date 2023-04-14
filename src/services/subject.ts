import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { API_REUSE_SUBJECT, API_SUBJECT } from '../constants/api-path';
import {
  CreateSubjectParams,
  Subject,
  UpdateSubjectParams,
} from '~/modules/Setting/Subjects/util/type';
import { ReuseParams } from '~/utils/types';

export const reuseSubject = (params: ReuseParams) => {
  const url = API_REUSE_SUBJECT;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

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

export const getSubjects = async (params: { semesterId: number }) => {
  const url = API_SUBJECT + '/get';
  return HttpClient.post<typeof params, CommonResponse<Subject[]>>(url, params);
};

export const getSubject = async (params: number) => {
  const url = API_SUBJECT + `\\${params}`;
  return HttpClient.get<typeof params, CommonResponse>(url);
};
