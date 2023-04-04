import {
  AreaSlotWeightData,
  CreateTimeSlotSegmentParams,
  SlotCompatibilityData,
  SlotConflictData,
  TimeSlot,
  TimeSlotSegment,
  UpdateAreaSlotWeight,
  UpdateTimeSlotCompatibility,
  UpdateTimeSlotConflict,
} from '~/modules/Setting/TimeSlots/utils/type';
import {
  API_AREA_TIME_SLOT_WEIGHT,
  API_GET_TIME_SLOT,
  API_GET_TIME_SLOT_SEGMENT,
  API_TIME_SLOT_COMPATIBILITY,
  API_TIME_SLOT_CONFLICT,
} from '../constants/api-path';
import HttpClient from '~/utils/HttpClient';
import { CommonResponse } from '~/utils/TypeCommon';

export const getTimeSlots = () => {
  const url = API_GET_TIME_SLOT;
  return HttpClient.get<null, CommonResponse<TimeSlot[]>>(url);
};

export const getTimeSlotSegments = () => {
  const url = API_GET_TIME_SLOT_SEGMENT;
  return HttpClient.get<null, CommonResponse<TimeSlotSegment[]>>(url);
};

export const createTimeSlotSegment = (params: CreateTimeSlotSegmentParams) => {
  const url = API_GET_TIME_SLOT_SEGMENT;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const updateTimeSlotConflict = async (
  params: UpdateTimeSlotConflict
) => {
  const url = API_TIME_SLOT_CONFLICT;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const updateTimeSlotCompatibility = async (
  params: UpdateTimeSlotCompatibility
) => {
  const url = API_TIME_SLOT_COMPATIBILITY;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const updateAreaSlotWeight = async (params: UpdateAreaSlotWeight) => {
  const url = API_AREA_TIME_SLOT_WEIGHT;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const getTimeSlotConflicts = async () => {
  const url = API_TIME_SLOT_CONFLICT;
  return HttpClient.get<null, CommonResponse<SlotConflictData[]>>(url);
};

export const getTimeSlotCompatibilities = async () => {
  const url = API_TIME_SLOT_COMPATIBILITY;
  return HttpClient.get<null, CommonResponse<SlotCompatibilityData[]>>(url);
};

export const getAreaSlotWeights = async () => {
  const url = API_AREA_TIME_SLOT_WEIGHT;
  return HttpClient.get<null, CommonResponse<AreaSlotWeightData[]>>(url);
};
