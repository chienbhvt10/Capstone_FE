import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import {
  API_LECTURER,
  API_LECTURER_SEARCH,
  API_REUSE_LECTURER,
} from '../constants/api-path';
import {
  CreateLecturerParams,
  GetLecturersParams,
  Lecturer,
  UpdateLecturerParams,
} from '~/modules/Setting/Lecturers/util/type';
import { ReuseParams } from '~/utils/types';

export const getLecturers = async (params: GetLecturersParams) => {
  const url = API_LECTURER_SEARCH;
  return HttpClient.post<typeof params, CommonResponse<Lecturer[]>>(
    url,
    params
  );
};

export const reuseLecturer = (params: ReuseParams) => {
  const url = API_REUSE_LECTURER;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const getLecturer = async (params: number) => {
  const url = API_LECTURER + `/${params}`;
  return HttpClient.get<typeof params, CommonResponse>(url);
};

export const createLecturer = async (params: CreateLecturerParams) => {
  const url = API_LECTURER;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateLecturer = async (params: UpdateLecturerParams) => {
  const url = API_LECTURER;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const deleteLecturer = async (params: number) => {
  const url = API_LECTURER + `/${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};
