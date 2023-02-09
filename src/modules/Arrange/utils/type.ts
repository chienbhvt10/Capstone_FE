export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  minHeight?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

export interface SlotInfo {
  id:
    | 'A24'
    | 'A42'
    | 'P24'
    | 'P42'
    | 'A25'
    | 'A52'
    | 'P25'
    | 'P52'
    | 'A35'
    | 'A53'
    | 'P35'
    | 'P53'
    | 'A36'
    | 'A63'
    | 'P36'
    | 'P63'
    | 'A46'
    | 'A64'
    | 'P46'
    | 'P64'
    | 'A77'
    | 'P77';
  class: string | null;
  subject: string | null;
  room: string | null;
}

export interface Row {
  id: number | null;
  lecturer: string | null;
  total: number | null;
  A24: SlotInfo | null;
  A42: SlotInfo | null;
  P24: SlotInfo | null;
  P42: SlotInfo | null;
  A25: SlotInfo | null;
  A52: SlotInfo | null;
  P25: SlotInfo | null;
  P52: SlotInfo | null;
  A35: SlotInfo | null;
  A53: SlotInfo | null;
  P35: SlotInfo | null;
  P53: SlotInfo | null;
  A36: SlotInfo | null;
  A63: SlotInfo | null;
  P36: SlotInfo | null;
  P63: SlotInfo | null;
  A46: SlotInfo | null;
  A64: SlotInfo | null;
  P46: SlotInfo | null;
  P64: SlotInfo | null;
  A77: SlotInfo | null;
  P77: SlotInfo | null;
}
