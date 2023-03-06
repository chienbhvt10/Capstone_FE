import type { CommonResponse, UploadImage } from 'types/common';

import HttpClient from 'utils/HttpClient';
export const executeArrange = async () => {};
export const getExecutedArrangeInfo = async () => {};
export const exportInImportFormat = async () => {};

export const importTimeTable = async (file: File) => {
  return HttpClient.post<FormData, CommonResponse<UploadImage>>(
    API_UPLOAD_FILE,
    params,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const swapLecturer = async () => {};
export const swapRoom = async () => {};
export const modifyTimetable = async () => {};
export const searchInThisExecutedArrange = async () => {};
