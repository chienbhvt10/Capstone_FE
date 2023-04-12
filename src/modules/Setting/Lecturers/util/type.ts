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

export interface RoomDistanceData {
  id: number;
  subjectCode: string;
  subjectName: string;
  department: string;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  semesterId: number;
  department: string;
}

export interface Lecturer {
  id: number;
  name: string;
  shortName: string;
  email: string;
  semesterId: number;
  quota: number;
  minQuota: number;
}

export interface GetLecturersParams {
  lecturerId: number | null;
  timeSlotId: number | null;
  subjectId: number | null;
}
export interface CreateLecturerParams {
  name: string;
  shortName: string;
  email: string;
  quota: number;
  minQuota: number;
}

export interface UpdateLecturerParams {
  id: number;
  name: string;
  shortName: string;
  email: string;
  quota: number;
  minQuota: number;
}
