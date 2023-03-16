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
} from '../constants/api-path';
import {
  LecturerAssign,
  TaskDetail,
  TimeSlotResponse,
  TimeTableModifyParam,
} from '../modules/Arrange/utils/type';

export const getTaskNotAssign = async () => {
  const url = API_GET_TASK_NOT_ASSIGNED;
  return HttpClient.get<number, CommonResponse<TimeSlotResponse>>(url);
};

export const getATask = async (taskId: number) => {
  const url = API_GET_A_TASK + taskId;
  return HttpClient.get<number, CommonResponse<TaskDetail>>(url);
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

export const modifyTimetable = async (params: TimeTableModifyParam) => {
  return HttpClient.put<typeof params, CommonResponse>(
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

export const searchInThisExecutedArrange = async () => {};
