import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import {
  API_EXPORT_IN_IMPORT_FORMAT,
  API_GET_A_TASK,
  API_GET_SCHEDULE,
  API_GET_TASK_NOT_ASSIGNED,
  API_IMPORT_TIME_TABLE,
  API_LOCK_UNLOCK_TASK,
  API_MODIFY_TIMETABLE,
  API_UNLOCK_ALL_TASK,
  API_EXECUTE,
  API_SEARCH_TASK,
  API_GET_TASK_ASSIGNED,
  API_GET_SEMESTER,
} from '../constants/api-path';

import {
  LecturerAssign,
  SearchTaskParams,
  SearchTaskResponse,
  SettingParams,
  TaskDetail,
  TimeSlotResponse,
  TimeTableModifyParam,
  TimeTableModifyResponse,
} from '../modules/Arrange/utils/type';
import { Semester } from '~/modules/Semester/util/type';

export const getSemester = async () => {
  const url = API_GET_SEMESTER;
  return HttpClient.get<null, CommonResponse<Semester[]>>(url);
};

export const getTaskNotAssign = async (params: { semesterId: number }) => {
  const url = API_GET_TASK_NOT_ASSIGNED;
  return HttpClient.post<typeof params, CommonResponse<TimeSlotResponse>>(
    url,
    params
  );
};

export const getTaskAssigned = async (params: { semesterId: number }) => {
  const url = API_GET_TASK_ASSIGNED;
  return HttpClient.post<typeof params, CommonResponse<LecturerAssign[]>>(
    url,
    params
  );
};

export const getATask = async (taskId: number) => {
  const url = API_GET_A_TASK + taskId;
  return HttpClient.get<number, CommonResponse<TaskDetail>>(url);
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
