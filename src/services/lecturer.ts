import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { API_LECTURER } from '../constants/api-path';
import { Lecturer } from '~/modules/Lecturer/util/type';

interface CreateLecturerParams {
  name: string;
  shortName: string;
  email: string;
}

interface UpdateLecturerParams {
  id: number;
  name: string;
  shortName: string;
  email: string;
}

export const createLecturer = async (params: CreateLecturerParams) => {
  const url = API_LECTURER;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateLecturer = async (params: UpdateLecturerParams) => {
  const url = API_LECTURER;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const deleteLecturer = async (params: number) => {
  const url = API_LECTURER + `\\${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};

export const getLecturers = async () => {
  const url = API_LECTURER;
  return HttpClient.get<number, CommonResponse<Lecturer[]>>(url);
};

export const getLecturer = async (params: number) => {
  const url = API_LECTURER + `\\${params}`;
  return HttpClient.get<typeof params, CommonResponse>(url);
};
