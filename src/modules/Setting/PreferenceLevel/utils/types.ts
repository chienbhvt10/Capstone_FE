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

export interface LecturerSubjectsPreferenceLevel {
  id: number;
  lecturer: string;
  subjects: {
    id: number;
    name: string;
    preferenceLevel: number;
  }[];
}

export interface LecturerSlotsPreferenceLevel {
  id: number;
  lecturer: string;
  slots: {
    id: number;
    name: string;
    preferenceLevel: number;
  }[];
}

export interface SubjectPreferenceLevelItems {
  value: number;
  label: string;
}

export interface SlotPreferenceLevelItems {
  value: number;
  label: string;
}
