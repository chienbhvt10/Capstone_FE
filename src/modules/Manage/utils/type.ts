export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  minHeight?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

export interface Row {
  id: number;
  email: string;
  fullName: string;
  shortName: string;
  expected: string;
  status: string;
}
