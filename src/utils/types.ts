export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  minHeight?: number;
  align?: 'right' | 'center' | 'left';
  sticky?: boolean;
  stickyPosition?: 'right' | 'left';
  format?: (value: number) => string;
}
export interface ReuseParams {
  fromSemesterId: number;
  toSemesterId: number;
}
