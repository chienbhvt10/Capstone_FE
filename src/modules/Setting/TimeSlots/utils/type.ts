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

export interface AreaSlotWeightInfos {
  slotWeightId: number;
  slotWeight: number;
  timeSlotId: number;
}

export interface AreaSlotWeightData {
  timeSlotId: number;
  semesterId: number;
  timeSlotName: string;
  areaSlotWeightInfos: AreaSlotWeightInfos[];
}

export interface SlotConflictInfos {
  conflictId: number;
  conflict: boolean;
  timeSlotId: number;
}

export interface SlotConflictData {
  timeSlotId: number;
  semesterId: number;
  timeSlotName: string;
  slotConflictInfos: SlotConflictInfos[];
}

export interface SlotCompatibilityInfos {
  compatibilityId: number;
  compatibilityLevel: number;
  timeSlotId: number;
}

export interface SlotCompatibilityData {
  timeSlotId: number;
  semesterId: number;
  timeSlotName: string;
  slotCompatibilityInfos: SlotCompatibilityInfos[];
}

export interface SlotConflictSelectItem {
  value: number;
  label: string;
}

export interface AreaSlotWeightSelectItem {
  value: number;
  label: string;
}

export interface TimeSlot {
  id: number;
  name: string;
  amorPm: boolean;
  semesterId: number;
}

export interface UpdateTimeSlotCompatibility {
  compatibilityId: number;
  compatibilityLevel: number;
}

export interface UpdateTimeSlotConflict {
  conflictId: number;
  conflict: boolean;
}

export interface UpdateAreaSlotWeight {
  slotWeightId: number;
  slotWeight: number;
}

export interface TimeSlotSegment {
  amorPm: number;
  semesterId: number;
  slotSegments: SlotSegment[];
  timeSlotId: number;
  timeSlotName: string;
}
export interface SlotSegment {
  segmentId: number;
  dayId: number;
  day: string;
  segment: number;
}

export interface SlotDay {
  id: number;
  selected?: boolean;
}

export interface Slot {
  id: number;
  slotDays: SlotDay[];
}

export interface TimeSlotSelect {
  id: number;
  slotSelected: SlotDay[];
}

export interface CreateTimeSlotSegmentParams {
  daySession: number;
  name: string;
  segments: CreateSegmentData[];
}

export interface CreateSegmentData {
  day: number;
  segment: number;
}
