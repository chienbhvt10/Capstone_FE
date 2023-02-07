export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  minHeight?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

export interface FirstColumn {
  slot: string;
  time: string;
}

export interface OtherColumn {
  day: string | null;
  class: string | null;
  subject: string | null;
  room: string | null;
  lecturer: string | null;
}

export interface Row {
  firstColumn: FirstColumn;
  otherColumns: OtherColumn[];
}
