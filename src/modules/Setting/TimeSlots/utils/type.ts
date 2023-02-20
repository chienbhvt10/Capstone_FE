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

export interface SlotWeightData {
  id: number;
  slot: string;
  slots: {
    id: number;
    name: string;
    slotWeight: number;
  }[];
}

export interface SlotConflictData {
  id: number;
  slot: string;
  slots: {
    id: number;
    name: string;
    conflictLevel: number;
  }[];
}

export interface SlotCompatibilityData {
  id: number;
  slot: string;
  slots: {
    id: number;
    name: string;
    conflictLevel: number;
  }[];
}

export interface SlotConflictSelectItem {
  value: number;
  label: string;
}

export interface AreaSlotWeightSelectItem {
  value: number;
  label: string;
}
