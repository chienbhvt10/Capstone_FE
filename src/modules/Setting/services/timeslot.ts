import { API_GET_TIME_SLOT } from '~/modules/Arrange/constants/api-path';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

export const getTimeSlot = () => {
  const url = API_GET_TIME_SLOT;
  return HttpClient.get<null, CommonResponse>(url);
};

export const updateTimeSlotConflict = async () => {};
export const updateTimeSlotCompatibility = async () => {};
export const updateAreaSlotWeight = async () => {};
export const getTimeSlotConflicts = async () => {};
export const getTimeSlotCompatibilities = async () => {};
export const getAreaSlotWeights = async () => {};
