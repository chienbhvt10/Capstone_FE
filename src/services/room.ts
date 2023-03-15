import { CommonResponse } from '~/utils/TypeCommon';

import HttpClient from '~/utils/HttpClient';
import { API_GET_ROOMS } from '../constants/api-path';
import { Room } from '~/modules/Setting/Rooms/util/type';

export const createBuilding = async () => {};
export const deleteBuilding = async () => {};
export const updateBuilding = async () => {};
export const createDistance = async () => {};

export const getRooms = async () => {
  const url = API_GET_ROOMS;
  return HttpClient.get<null, CommonResponse<Room[]>>(url);
};
