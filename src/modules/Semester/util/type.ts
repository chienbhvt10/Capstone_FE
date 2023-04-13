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

export interface Semester {
  id: number;
  isNow: boolean;
  semester: string;
  year: string;
}

export interface CreateSemesterParams {
  isNow?: boolean;
  year: string;
  semester: string;
}

export interface UpdateSemesterParams {
  id: number;
  isNow?: boolean;
  year: string;
  semester: string;
}
