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

export interface CreateSubjectParams {
  code: string;
  name: string;
  department: string;
}

export interface UpdateSubjectParams {
  id: number;
  code: string;
  name: string;
  department: string;
}
