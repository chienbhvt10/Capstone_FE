import { createContext, useEffect, useState } from 'react';
import useRefresh from '~/hooks/useRefresh';
import {
  Class,
  ExecuteInfo,
  LecturerAssign,
  Semester,
  TaskDetail,
  TimeSlotResponse,
} from '~/modules/Arrange/utils/type';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { Building, Room } from '~/modules/Setting/Rooms/util/type';
import { Subject } from '~/modules/Setting/Subjects/util/type';
import { TimeSlot } from '~/modules/Setting/TimeSlots/utils/type';
import {
  getExecutedArrangeInfo,
  getTaskAssigned,
  getTaskNotAssign,
} from '~/services/arrange';
import { getClasses } from '~/services/class';
import { getExecuteInfos } from '~/services/execute';
import { getLecturers } from '~/services/lecturer';
import { getAllBuilding, getRooms } from '~/services/distance';
import { getSubjects } from '~/services/subject';
import { getTimeSlots } from '~/services/timeslot';
import wait from '~/utils/wait';

export interface ArrangeContextValue {
  lecturersTaskAssignInfo: LecturerAssign[];
  setLecturersTaskAssignInfo: React.Dispatch<
    React.SetStateAction<LecturerAssign[]>
  >;
  tasksNotAssignedInfo: TimeSlotResponse | null;
  setTasksNotAssigned: React.Dispatch<
    React.SetStateAction<TimeSlotResponse | null>
  >;
  timeSlots: TimeSlot[];
  setTimeSlots: React.Dispatch<any>;
  taskSelect: TaskDetail | null;
  setTaskSelect: React.Dispatch<React.SetStateAction<TaskDetail | null>>;
  lecturers: Lecturer[];
  setLecturers: React.Dispatch<React.SetStateAction<Lecturer[]>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  executeId: number;
  setExecuteId: React.Dispatch<React.SetStateAction<number>>;
  refetch: React.DispatchWithoutAction;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  classes: Class[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  executeInfos: ExecuteInfo[];
  setExecuteInfos: React.Dispatch<React.SetStateAction<ExecuteInfo[]>>;
  loadingTimeTable: boolean;
  setLoadingTimeTable: React.Dispatch<React.SetStateAction<boolean>>;
  loadingTimeTableModify: boolean;
  setLoadingTimeTableModify: React.Dispatch<React.SetStateAction<boolean>>;
  refetchListExecuteInfo: React.DispatchWithoutAction;
  refetchLecturer: React.DispatchWithoutAction;
  refetchSubject: React.DispatchWithoutAction;
  refetchRoom: React.DispatchWithoutAction;
  refetchClass: React.DispatchWithoutAction;
  refetchTimeSlot: React.DispatchWithoutAction;
  refetchBuilding: React.DispatchWithoutAction;
  refetchSemester: React.DispatchWithoutAction;
  buildings: Building[];
  setBuildings: React.Dispatch<React.SetStateAction<Building[]>>;
  semestersSelector: Semester | null;
  setSemestersSelector: React.Dispatch<React.SetStateAction<Semester | null>>;
  semesters: Semester[];
  setSemester: React.Dispatch<React.SetStateAction<Semester[]>>;
}

export const ArrangeContext = createContext<ArrangeContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  ArrangeContext.displayName = 'ArrangeContext';
}

const ArrangeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [refresh, refetch] = useRefresh();
  const [refreshListExecuteInfo, refetchListExecuteInfo] = useRefresh();
  const [refreshLecturer, refetchLecturer] = useRefresh();
  const [refreshSubject, refetchSubject] = useRefresh();
  const [refreshRoom, refetchRoom] = useRefresh();
  const [refreshClass, refetchClass] = useRefresh();
  const [refreshTimeSlot, refetchTimeSlot] = useRefresh();
  const [refreshBuilding, refetchBuilding] = useRefresh();
  const [refreshSemester, refetchSemester] = useRefresh();

  const [executeId, setExecuteId] = useState<number>(0);
  const [semesters, setSemester] = useState<Semester[]>([]);
  const [lecturersTaskAssignInfo, setLecturersTaskAssignInfo] = useState<
    LecturerAssign[]
  >([]);
  const [tasksNotAssignedInfo, setTasksNotAssigned] =
    useState<TimeSlotResponse | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [taskSelect, setTaskSelect] = useState<TaskDetail | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [executeInfos, setExecuteInfos] = useState<ExecuteInfo[]>([]);
  const [loadingTimeTable, setLoadingTimeTable] = useState<boolean>(false);
  const [loadingTimeTableModify, setLoadingTimeTableModify] =
    useState<boolean>(false);

  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );
  useEffect(() => {
    if (executeId) {
      getExecutedArrangeInfo(executeId).then((res) => refetch());
    }
  }, [executeId]);

  useEffect(() => {
    getTaskAssigned().then((res) => {
      if (res.data && res.data.length > 0) {
        setLecturersTaskAssignInfo(res.data);
      }
      getTaskNotAssign().then((res) => {
        if (
          res.data &&
          res.data.timeSlotInfos &&
          res.data.timeSlotInfos.length > 0
        ) {
          setTasksNotAssigned(res.data);
        }
      });
    });
  }, [refresh]);

  useEffect(() => {
    getExecuteInfos().then((res) => {
      if (res.data && res.data.length > 0) {
        setExecuteInfos(res.data || []);
      }
    });
  }, [refreshListExecuteInfo]);

  useEffect(() => {
    getLecturers().then((res) => {
      if (res.data) {
        setLecturers(res.data);
      }
    });
  }, [refreshLecturer]);

  useEffect(() => {
    getSubjects().then((res) => {
      if (res.data) {
        setSubjects(res.data);
      }
    });
  }, [refreshSubject]);

  useEffect(() => {
    getRooms().then((res) => {
      if (res.data) {
        setRooms(res.data);
      }
    });
  }, [refreshRoom]);

  useEffect(() => {
    getClasses().then((res) => {
      if (res.data) {
        setClasses(res.data);
      }
    });
  }, [refreshClass]);

  useEffect(() => {
    getTimeSlots().then((res) => {
      if (res.data && res.data.length > 0) {
        setTimeSlots(res.data || []);
      }
    });
  }, [refreshTimeSlot]);

  useEffect(() => {
    getAllBuilding().then((res) => {
      if (res.data && res.data.length > 0) {
        setBuildings(res.data || []);
      }
    });
  }, [refreshBuilding]);

  useEffect(() => {
    getAllBuilding().then((res) => {
      if (res.data && res.data.length > 0) {
        setBuildings(res.data || []);
      }
    });
  }, [refreshBuilding]);

  return (
    <ArrangeContext.Provider
      value={{
        semesters,
        setSemester,
        refetchSemester,
        semestersSelector,
        setSemestersSelector,
        buildings,
        refetchBuilding,
        setBuildings,
        loadingTimeTableModify,
        loadingTimeTable,
        executeInfos,
        classes,
        rooms,
        subjects,
        executeId,
        lecturers,
        timeSlots,
        taskSelect,
        tasksNotAssignedInfo,
        lecturersTaskAssignInfo,
        refetch,
        refetchListExecuteInfo,
        refetchClass,
        refetchLecturer,
        refetchRoom,
        refetchSubject,
        refetchTimeSlot,
        setLoadingTimeTable,
        setLoadingTimeTableModify,
        setExecuteInfos,
        setClasses,
        setSubjects,
        setRooms,
        setExecuteId,
        setTimeSlots,
        setLecturers,
        setTaskSelect,
        setTasksNotAssigned,
        setLecturersTaskAssignInfo,
      }}
    >
      {children}
    </ArrangeContext.Provider>
  );
};

const ArrangeConsumer = ArrangeContext.Consumer;
export { ArrangeConsumer, ArrangeProvider, ArrangeContext as default };
