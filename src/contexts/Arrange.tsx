import { createContext, useEffect, useState } from 'react';
import useRefresh from '~/hooks/useRefresh';
import {
  Class,
  LecturerAssign,
  TaskDetail,
  TimeSlotResponse,
} from '~/modules/Arrange/utils/type';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { Semester } from '~/modules/Semester/util/type';
import {
  Building,
  BuildingDistanceData,
  Room,
} from '~/modules/Setting/Rooms/util/type';
import { Subject } from '~/modules/Setting/Subjects/util/type';
import { TimeSlot } from '~/modules/Setting/TimeSlots/utils/type';
import {
  getExecutedArrangeInfo,
  getTaskAssigned,
  getTaskNotAssign,
} from '~/services/arrange';
import { getClasses } from '~/services/class';
import { getAllBuilding, getDistances, getRooms } from '~/services/distance';
import { getLecturers } from '~/services/lecturer';
import { getSemesters } from '~/services/semester';
import { getSubjects } from '~/services/subject';
import { getTimeSlots } from '~/services/timeslot';

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
  loadingTimeTable: boolean;
  setLoadingTimeTable: React.Dispatch<React.SetStateAction<boolean>>;
  loadingTimeTableModify: boolean;
  setLoadingTimeTableModify: React.Dispatch<React.SetStateAction<boolean>>;
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
  setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>;
  currentSemester: Semester | null;
  setCurrentSemester: React.Dispatch<React.SetStateAction<Semester | null>>;
  setDistances: React.Dispatch<React.SetStateAction<BuildingDistanceData[]>>;
  distances: BuildingDistanceData[];
}

export const ArrangeContext = createContext<ArrangeContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  ArrangeContext.displayName = 'ArrangeContext';
}

const ArrangeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [refresh, refetch] = useRefresh();
  const [refreshLecturer, refetchLecturer] = useRefresh();
  const [refreshSubject, refetchSubject] = useRefresh();
  const [refreshRoom, refetchRoom] = useRefresh();
  const [refreshClass, refetchClass] = useRefresh();
  const [refreshTimeSlot, refetchTimeSlot] = useRefresh();
  const [refreshBuilding, refetchBuilding] = useRefresh();
  const [refreshSemester, refetchSemester] = useRefresh();
  const [executeId, setExecuteId] = useState<number>(0);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [currentSemester, setCurrentSemester] = useState<Semester | null>(null);
  const [lecturersTaskAssignInfo, setLecturersTaskAssignInfo] = useState<
    LecturerAssign[]
  >([]);
  const [tasksNotAssignedInfo, setTasksNotAssigned] =
    useState<TimeSlotResponse | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [distances, setDistances] = useState<BuildingDistanceData[]>([]);

  const [taskSelect, setTaskSelect] = useState<TaskDetail | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
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
    getLecturers({
      lecturerId: null,
      subjectId: null,
      timeSlotId: null,
    }).then((res) => {
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
    getDistances().then((res) => {
      if (res.data && res.data.length > 0) {
        setDistances(res.data || []);
      }
    });
  }, [refreshBuilding]);

  useEffect(() => {
    getSemesters().then((res) => {
      if (res.data && res.data.length > 0) {
        setSemesters(res.data || []);
        setCurrentSemester(res.data.filter((item) => item.isNow)[0]);
        setSemestersSelector(res.data.filter((item) => item.isNow)[0]);
      }
    });
  }, [refreshSemester]);

  return (
    <ArrangeContext.Provider
      value={{
        distances,
        setDistances,
        currentSemester,
        setCurrentSemester,
        semesters,
        setSemesters,
        refetchSemester,
        semestersSelector,
        setSemestersSelector,
        buildings,
        refetchBuilding,
        setBuildings,
        loadingTimeTableModify,
        loadingTimeTable,
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
        refetchClass,
        refetchLecturer,
        refetchRoom,
        refetchSubject,
        refetchTimeSlot,
        setLoadingTimeTable,
        setLoadingTimeTableModify,
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
