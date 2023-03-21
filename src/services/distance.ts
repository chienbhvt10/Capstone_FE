import { API_BUILDING, API_DISTANCE } from '../constants/api-path';
import { CommonResponse } from '~/utils/TypeCommon';

import HttpClient from '~/utils/HttpClient';
import { API_GET_ROOMS } from '../constants/api-path';
import {
  Building,
  BuildingDistanceData,
  CreateBuildingParams,
  Room,
  UpdateDistanceParams,
} from '~/modules/Setting/Rooms/util/type';

export const createBuilding = async (params: CreateBuildingParams) => {
  const url = API_BUILDING;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};
export const deleteBuilding = async () => {};
export const updateBuilding = async () => {};
export const createDistance = async () => {};

export const updateDistance = async (params: UpdateDistanceParams) => {
  return HttpClient.put<typeof params, CommonResponse>(API_DISTANCE, params);
};

export const getRooms = async () => {
  const url = API_GET_ROOMS;
  return HttpClient.get<null, CommonResponse<Room[]>>(url);
};

export const getDistances = async () => {
  const url = API_DISTANCE;
  return HttpClient.get<null, CommonResponse<BuildingDistanceData[]>>(url);
};

export const getAllBuilding = async () => {
  const url = API_BUILDING;
  return HttpClient.get<null, CommonResponse<Building[]>>(url);
};