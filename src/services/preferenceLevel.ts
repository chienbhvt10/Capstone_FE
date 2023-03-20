import {
  API_SLOT_PREFERENCE_LEVELS,
  API_SUBJECT_PREFERENCE_LEVELS,
} from '~/constants/api-path';
import {
  LecturerSlotsPreferenceLevel,
  LecturerSubjectsPreferenceLevel,
  UpdateSlotPreferenceLevel,
  UpdateSubjectPreferenceLevel,
} from '~/modules/Setting/PreferenceLevel/utils/types';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

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

export const getSlotPreferenceLevels = async () => {
  const url = API_SLOT_PREFERENCE_LEVELS;
  return HttpClient.get<null, CommonResponse<LecturerSlotsPreferenceLevel[]>>(
    url
  );
};

export const getSubjectPreferenceLevels = async () => {
  const url = API_SUBJECT_PREFERENCE_LEVELS;
  return HttpClient.get<
    null,
    CommonResponse<LecturerSubjectsPreferenceLevel[]>
  >(url);
};
