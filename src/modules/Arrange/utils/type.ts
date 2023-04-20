export interface Column {
  id?: string | null;
  label: string | null;
  minWidth?: number | null;
  minHeight?: number | null;
  align?: 'right' | 'center' | 'left';
  sticky?: boolean | null;
  stickyPosition?: ('right' | 'left') | null;
  zIndex?: number;
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
  subjectCode: string;
  subjectName: string;
  taskId: number;
  timeSlotId: number;
  timeSlotName: string;
  timeSlotOrder: number;
  preAssign: boolean;
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
  subjectCode: string;
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
}

export interface SwapLecturerParams {
  lecturerId: number;
  taskId: number;
  timeSlotId: number;
  semesterId: number;
  departmentHeadId: number;
}

export interface SwapRoomParams {
  roomId: number;
  taskId: number;
  semesterId: number;
  departmentHeadId: number;
}

export interface TimeTableModifyResponse {
  taskNeedAssign: TaskDetail;
  taskSameTimeSlot: TaskDetail;
}

export interface Class {
  id: number;
  name: string;
  semesterId: number;
}

export interface ExecuteInfo {
  id: number;
  executeId: string;
  executeTime: string;
  semesterId: number;
}
export interface SettingParams {
  departmentHeadId: number;
  maxSearchingTime: number;
  solver: number;
  strategy: number;
  objectiveOption: number[];
  objectiveWeight: number[];
}

export interface SearchTaskParams {
  departmentHeadId: number;
  semesterId: number;
  classIds: number[];
  lecturerIds: number[];
  subjectIds: number[];
  roomId: number[];
}

export interface SearchTaskResponse {
  dataAssign: LecturerAssign[];
  dataNotAssign: TimeSlotResponse;
}
export interface GetATaskParams {
  semesterId: number | null;
  taskId: number;
  departmentHeadId: number | null;
}
