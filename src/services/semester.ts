import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { API_GET_SEMESTER } from '../constants/api-path';
import { Semester } from '~/modules/Semester/util/type';

interface CreateSemesterParams {
  isNow?: boolean;
  year: string;
  semester: string;
}

interface UpdateSemesterParams {
  id: number;
  isNow?: boolean;
  year: string;
  semester: string;
}

export const createSemester = async (params: CreateSemesterParams) => {
  const url = API_GET_SEMESTER;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateSemester = async (params: UpdateSemesterParams) => {
  const url = API_GET_SEMESTER;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const deleteSemester = async (params: number) => {
  const url = API_GET_SEMESTER + `\\${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};

export const getSemesters = async () => {
  const url = API_GET_SEMESTER;
  return HttpClient.get<number, CommonResponse<Semester[]>>(url);
};

export const getSemester = async (params: number) => {
  const url = API_GET_SEMESTER + `\\${params}`;
  return HttpClient.get<typeof params, CommonResponse>(url);
};
