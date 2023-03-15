export interface Column {
  id: string | null;
  label: string | null;
  minWidth?: number | null;
  minHeight?: number | null;
  align?: 'right' | 'center' | 'left';
  sticky?: boolean | null;
  stickyPosition?: ('right' | 'left') | null;
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
  orderNumber: number;
  department: string;
}
