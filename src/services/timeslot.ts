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
  API_REUSE_TIME_SLOT,
  API_TIME_SLOT_CONFLICT,
} from '../constants/api-path';
import { GetAllParams, ReuseParams } from '~/utils/types';

//#region TimeSlot Api

export const getTimeSlots = (params: GetAllParams) => {
  const url = API_GET_TIME_SLOT + '/get';
  return HttpClient.post<typeof params, CommonResponse<TimeSlot[]>>(
    url,
    params
  );
};

export const reuseTimeSlot = (params: ReuseParams) => {
  const url = API_REUSE_TIME_SLOT;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
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

export const getTimeSlotSegments = (params: GetAllParams) => {
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

export const getTimeSlotConflicts = async (params: GetAllParams) => {
  const url = API_TIME_SLOT_CONFLICT;
  return HttpClient.post<typeof params, CommonResponse<SlotConflictData[]>>(
    url,
    params
  );
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

export const getAreaSlotWeights = async (params: GetAllParams) => {
  const url = API_AREA_TIME_SLOT_WEIGHT;
  return HttpClient.post<typeof params, CommonResponse<AreaSlotWeightData[]>>(
    url,
    params
  );
};
//#endregion
