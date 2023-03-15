export interface Column {
  id?: string | null;
  label: string | null;
  minWidth?: number | null;
  minHeight?: number | null;
  align?: 'right' | 'center' | 'left';
  sticky?: boolean | null;
  stickyPosition?: ('right' | 'left') | null;
  format?: ((value: number) => string) | null;
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

export interface LecturerAssign {
  lecturerId: number | null;
  lecturerName: string | null;
  semesterId: number | null;
  total: number | null;
  timeSlotInfos: TimeSlotTask[];
}

export interface TimeSlotTask {
  classId: number;
  className: string;
  isAssign: number;
  roomId: number;
  roomName: string;
  status: null;
  subjectId: number;
  subjectName: string;
  taskId: number;
  timeSlotId: number;
  timeSlotName: string;
  timeSlotOrder: number;
}

export interface TimeSlot {
  description: string;
  id: number;
  name: string;
  orderNumber: number;
  semesterId: null;
  slot1: string;
  slot2: string;
}

export interface TimeSlotResponse {
  total: number | null;
  timeSlotInfos: Array<Array<TimeSlotTask>>;
}

export interface TaskDetail {
  taskId: number;
  lecturerId: number;
  lecturerName: string;
  timeSlotId: number;
  timeSlotName: string;
  timeSlotOrder: number;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  semesterId: number;
  roomId: number;
  roomName: string;
  status: string;
  isAssign: number;
}

export interface TimeTableModifyParam {
  taskId: number | null;
  lecturerId: number | null;
  roomId: number | null;
}

export interface Class {
  id: number;
  name: string;
  semesterId: number;
}
