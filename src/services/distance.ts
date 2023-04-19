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
  UpdateBuildingParams,
} from '~/modules/Setting/Rooms/util/type';
import { GetAllParams, ReuseParams } from '~/utils/types';

export const createBuilding = async (params: CreateBuildingParams) => {
  const url = API_BUILDING;
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};

export const deleteBuilding = async (params: number) => {
  const url = API_BUILDING + `/${params}`;
  return HttpClient.delete<typeof params, CommonResponse>(url);
};

export const updateBuilding = async (params: UpdateBuildingParams) => {
  const url = API_BUILDING;
  return HttpClient.put<typeof params, CommonResponse>(url, params);
};

export const updateDistance = async (params: UpdateDistanceParams) => {
  return HttpClient.put<typeof params, CommonResponse>(API_DISTANCE, params);
};

export const getRooms = async (params: GetAllParams) => {
  const url = API_GET_ROOMS;
  return HttpClient.post<typeof params, CommonResponse<Room[]>>(url, params);
};

export const getDistances = async (params: GetAllParams) => {
  const url = API_DISTANCE + '/get';
  return HttpClient.post<typeof params, CommonResponse<BuildingDistanceData[]>>(
    url,
    params
  );
};

export const getAllBuilding = async (params: GetAllParams) => {
  const url = API_BUILDING + '/get';
  return HttpClient.post<typeof params, CommonResponse<Building[]>>(
    url,
    params
  );
};

export const reuseBuilding = (params: ReuseParams) => {
  const url = API_BUILDING + '/reuse';
  return HttpClient.post<typeof params, CommonResponse>(url, params);
};
