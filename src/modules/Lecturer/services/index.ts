import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { API_GET_ALL_LECTURER } from '../constants/api-path';

export const createLecturer = async () => {};
export const updateLecturer = async () => {};
export const registerLecturer = async () => {};
export const approveRegisterLecturer = async () => {};

export const getLecturers = async () => {
  const url = API_GET_ALL_LECTURER;
  return HttpClient.get<number, CommonResponse>(url);
};

export const getLecturer = async () => {};
