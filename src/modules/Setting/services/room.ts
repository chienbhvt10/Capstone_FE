import { CommonResponse } from '~/utils/TypeCommon';
import { Room } from '../Rooms/util/type';
import HttpClient from '~/utils/HttpClient';
import { API_GET_ROOMS } from '../constants/api-path';

export const createBuilding = async () => {};
export const deleteBuilding = async () => {};
export const updateBuilding = async () => {};
export const createDistance = async () => {};

export const getRooms = async () => {
  const url = API_GET_ROOMS;
  return HttpClient.get<null, CommonResponse<Room[]>>(url);
};
