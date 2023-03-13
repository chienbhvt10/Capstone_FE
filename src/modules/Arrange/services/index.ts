import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import {
  API_EXPORT_IN_IMPORT_FORMAT,
  API_GET_SCHEDULE,
  API_GET_TASK_NOT_ASSIGNED,
  API_IMPORT_TIME_TABLE,
} from '../constants/api-path';
import { LecturerAssign } from '../utils/type';

export const getTaskNotAssign = async () => {
  const url = API_GET_TASK_NOT_ASSIGNED;
  return HttpClient.get<number, CommonResponse>(url);
};

export const executeArrange = async () => {};

export const getExecutedArrangeInfo = async (executeId: number) => {
  const url = API_GET_SCHEDULE + executeId;
  return HttpClient.get<number, CommonResponse<LecturerAssign[]>>(url);
};

export const exportInImportFormat = async (params: any) => {
  return HttpClient.post<any, CommonResponse>(
    API_EXPORT_IN_IMPORT_FORMAT,
    params
  );
};

export const importTimeTable = async (params: FormData) => {
  return HttpClient.post<FormData, CommonResponse>(
    API_IMPORT_TIME_TABLE,
    params,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const swapLecturer = async () => {};
export const swapRoom = async () => {};
export const modifyTimetable = async () => {};
export const searchInThisExecutedArrange = async () => {};
