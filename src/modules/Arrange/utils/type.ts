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

export interface SlotInfo {
  id: number | null;
  class: string | null;
  subject: string | null;
  room: string | null;
}

export interface Slot {
  code: string;
  slotInfo?: SlotInfo[];
}

export interface Row {
  id: number | null;
  lecturer: string | null;
  total: number | null;
  slots: Slot[];
}
