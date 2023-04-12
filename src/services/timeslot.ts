import {
  AreaSlotWeightData,
  CreateTimeSlotParams,
  CreateTimeSlotSegmentParams,
  SlotConflictData,
  SlotSegment,
  TimeSlot,
  TimeSlotSegment,
  UpdateAreaSlotWeight,
  UpdateTimeSlotConflict,
  UpdateTimeSlotParams,
  UpdateTimeSlotSegmentParams,
} from '~/modules/Setting/TimeSlots/utils/type';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';
import {
  API_AREA_TIME_SLOT_WEIGHT,
  API_GET_TIME_SLOT,
  API_GET_TIME_SLOT_SEGMENT,
  API_TIME_SLOT_CONFLICT,
} from '../constants/api-path';

//#region TimeSlot Api

export const getTimeSlots = (params: { semesterId: number }) => {
  const url = API_GET_TIME_SLOT + '/get';
  return HttpClient.post<typeof params, CommonResponse<TimeSlot[]>>(
    url,
    params
  );
};

export const createTimeSlot = (params: CreateTimeSlotParams) => {
  const url = API_GET_TIME_SLOT;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateTimeSlot = async (params: UpdateTimeSlotParams) => {
  const url = API_GET_TIME_SLOT;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const deleteTimeSlot = async (params: number) => {
  const url = API_GET_TIME_SLOT + `\\${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};

//#endregion

//#region TimeSlotSegment Api

export const getTimeSlotSegments = (params: { semesterId: number }) => {
  const url = API_GET_TIME_SLOT_SEGMENT + '/get';
  return HttpClient.post<typeof params, CommonResponse<TimeSlotSegment[]>>(
    url,
    params
  );
};

export const createTimeSlotSegment = (params: CreateTimeSlotSegmentParams) => {
  const url = API_GET_TIME_SLOT_SEGMENT;
  return HttpClient.post<typeof params, CommonResponse<SlotSegment>>(
    url,
    params
  );
};

export const updateTimeSlotSegment = async (
  params: UpdateTimeSlotSegmentParams
) => {
  const url = API_GET_TIME_SLOT_SEGMENT;
  return HttpClient.put<typeof params, CommonResponse<SlotSegment>>(
    url,
    params
  );
};

export const deleteTimeSlotSegment = async (params: number) => {
  const url = API_GET_TIME_SLOT_SEGMENT + `\\${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};

//#endregion

//#region TimeSlot conflict Api

export const getTimeSlotConflicts = async () => {
  const url = API_TIME_SLOT_CONFLICT;
  return HttpClient.get<null, CommonResponse<SlotConflictData[]>>(url);
};

export const updateTimeSlotConflict = async (
  params: UpdateTimeSlotConflict
) => {
  const url = API_TIME_SLOT_CONFLICT;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

//#endregion

//#region Area TimeSlot Weight Api
export const updateAreaSlotWeight = async (params: UpdateAreaSlotWeight) => {
  const url = API_AREA_TIME_SLOT_WEIGHT;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const getAreaSlotWeights = async () => {
  const url = API_AREA_TIME_SLOT_WEIGHT;
  return HttpClient.get<null, CommonResponse<AreaSlotWeightData[]>>(url);
};
//#endregion
