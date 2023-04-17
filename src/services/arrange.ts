import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import {
  API_EXECUTE,
  API_EXPORT_IN_IMPORT_FORMAT,
  API_GET_A_TASK,
  API_GET_SCHEDULE,
  API_GET_TASK_ASSIGNED,
  API_GET_TASK_NOT_ASSIGNED,
  API_IMPORT_TIME_TABLE,
  API_LOCK_UNLOCK_TASK,
  API_MODIFY_TIMETABLE,
  API_SEARCH_TASK,
  API_UNLOCK_ALL_TASK,
} from '../constants/api-path';

import { GetAllParams } from '~/utils/types';
import {
  GetATaskParams,
  LecturerAssign,
  SearchTaskParams,
  SearchTaskResponse,
  SettingParams,
  TaskDetail,
  TimeSlotResponse,
  TimeTableModifyParam,
  TimeTableModifyResponse,
} from '../modules/Arrange/utils/type';

export const getTaskNotAssign = async (params: GetAllParams) => {
  const url = API_GET_TASK_NOT_ASSIGNED;
  return HttpClient.post<typeof params, CommonResponse<TimeSlotResponse>>(
    url,
    params
  );
};

export const getTaskAssigned = async (params: GetAllParams) => {
  const url = API_GET_TASK_ASSIGNED;
  return HttpClient.post<typeof params, CommonResponse<LecturerAssign[]>>(
    url,
    params
  );
};

export const getATask = async (params: GetATaskParams) => {
  const url = API_GET_A_TASK;
  return HttpClient.post<typeof params, CommonResponse<TaskDetail>>(
    url,
    params
  );
};

export const executeArrange = async (params: SettingParams) => {
  return HttpClient.post<typeof params, CommonResponse>(API_EXECUTE, params);
};

export const getExecutedArrangeInfo = async (executeId: number) => {
  const url = API_GET_SCHEDULE + executeId;
  return HttpClient.get<number, CommonResponse>(url);
};

export const exportInImportFormat = async () => {
  return HttpClient.get(API_EXPORT_IN_IMPORT_FORMAT, {
    responseType: 'blob',
  });
};

export const importTimeTable = async (params: FormData) => {
  return HttpClient.post<FormData, CommonResponse>(
    API_IMPORT_TIME_TABLE,
    params,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const modifyTimetable = async (params: TimeTableModifyParam) => {
  return HttpClient.put<typeof params, CommonResponse<TimeTableModifyResponse>>(
    API_MODIFY_TIMETABLE,
    params
  );
};

export const lockAndUnLockTask = async (params: {
  taskId: number;
  lecturerId: number;
}) => {
  return HttpClient.put<typeof params, CommonResponse>(
    API_LOCK_UNLOCK_TASK,
    params
  );
};

export const unLockAllTask = async () => {
  return HttpClient.put<null, CommonResponse>(API_UNLOCK_ALL_TASK);
};

export const searchTask = async (params: SearchTaskParams) => {
  return HttpClient.post<typeof params, CommonResponse<SearchTaskResponse>>(
    API_SEARCH_TASK,
    params
  );
};
