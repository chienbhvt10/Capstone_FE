import {
  API_REUSE_SLOT_PREFERENCE,
  API_REUSE_SUBJECT_PREFERENCE,
  API_SLOT_PREFERENCE_LEVELS,
  API_SUBJECT_PREFERENCE_LEVELS,
} from '~/constants/api-path';
import {
  LecturerSlotsPreferenceLevel,
  LecturerSlotsPreferenceLevelResponse,
  LecturerSubjectsPreferenceLevel,
  LecturerSubjectsPreferenceLevelResponse,
  UpdateSlotPreferenceLevel,
  UpdateSubjectPreferenceLevel,
} from '~/modules/Setting/PreferenceLevel/utils/types';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import { GetAllParams, ReuseParams } from '~/utils/types';

export const reuseSlotPreference = (params: ReuseParams) => {
  const url = API_REUSE_SLOT_PREFERENCE;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const reuseSubjectPreference = (params: ReuseParams) => {
  const url = API_REUSE_SUBJECT_PREFERENCE;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateSlotPreferenceLevel = async (
  params: UpdateSlotPreferenceLevel
) => {
  const url = API_SLOT_PREFERENCE_LEVELS;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const updateSubjectPreferenceLevel = async (
  params: UpdateSubjectPreferenceLevel
) => {
  const url = API_SUBJECT_PREFERENCE_LEVELS;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export interface GetPreferenceLevelsRequest {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  getAllRequest: GetAllParams;
}

export const getSlotPreferenceLevels = async (
  params: GetPreferenceLevelsRequest
) => {
  const url = API_SLOT_PREFERENCE_LEVELS;
  return HttpClient.post<
    typeof params,
    CommonResponse<LecturerSlotsPreferenceLevelResponse>
  >(url, params);
};

export const createDefaultSlotPreferenceLevels = async (
  params: GetAllParams
) => {
  const url = API_SLOT_PREFERENCE_LEVELS + '/create-default';
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const getSubjectPreferenceLevels = async (
  params: GetPreferenceLevelsRequest
) => {
  const url = API_SUBJECT_PREFERENCE_LEVELS;
  return HttpClient.post<
    typeof params,
    CommonResponse<LecturerSubjectsPreferenceLevelResponse>
  >(url, params);
};
