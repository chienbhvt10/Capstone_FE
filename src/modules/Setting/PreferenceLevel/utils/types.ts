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

export interface LecturerSlotsPreferenceLevelResponse {
  slotPreferenceLevels: LecturerSlotsPreferenceLevel[];
  total: number;
}
export interface LecturerSubjectsPreferenceLevelResponse {
  subjectPreferenceLevels: LecturerSubjectsPreferenceLevel[];
  total: number;
}
export interface LecturerSubjectsPreferenceLevel {
  lecturerId: number;
  semesterId: number;
  lecturerName: string;
  preferenceInfos: LecturerSubjectsPreferenceInfo[];
}
export interface LecturerSubjectsPreferenceInfo {
  preferenceId: number;
  preferenceLevel: number;
  subjectId: number;
}

export interface LecturerSlotsPreferenceLevel {
  lecturerId: number;
  semesterId: number;
  lecturerName: string;
  preferenceInfos: LecturerSlotsPreferenceInfo[];
}

export interface LecturerSlotsPreferenceInfo {
  preferenceId: number;
  preferenceLevel: number;
  timeSlotId: number;
}

export interface SubjectPreferenceLevelItems {
  value: number;
  label: string;
}

export interface SlotPreferenceLevelItems {
  value: number;
  label: string;
}

export interface UpdateSlotPreferenceLevel {
  preferenceId: number;
  preferenceLevel: number;
}

export interface UpdateSubjectPreferenceLevel {
  preferenceId: number;
  preferenceLevel: number;
}
