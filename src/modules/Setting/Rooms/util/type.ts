export interface Column {
  id: string | null;
  label: string | null;
  minWidth?: number | null;
  minHeight?: number | null;
  align?: 'right' | 'center' | 'left';
  sticky?: boolean | null;
  stickyPosition?: ('right' | 'left') | null;
  zIndex?: number;
  format?: ((value: number) => string) | null;
}

export interface BuildingDistanceData {
  buildingId: number;
  buildingName: string;
  semesterId: number;
  buildingDistances: BuildingDistanceInfos[];
}

export interface BuildingDistanceInfos {
  id: number;
  buildingDistanceId: number;
  distanceBetween: number;
}

export interface Room {
  id: number;
  name: string;
}

export interface Building {
  id: number;
  name: string;
  shortName: string;
  semesterId: number;
}
export interface CreateBuildingParams {
  name: string | null;
  shortName: string;
  departmentHeadId: number | null;
  semesterId: number | null;
}

export interface UpdateBuildingParams {
  id: number;
  name: string;
  shortName: string;
}

export interface UpdateDistanceParams {
  distanceId: number;
  distanceBetween: number;
}
