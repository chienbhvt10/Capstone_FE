import { createContext, useEffect, useState } from 'react';
import useRefresh from '~/hooks/useRefresh';
import {
  Class,
  ExecuteInfo,
  LecturerAssign,
  TaskDetail,
  TimeSlotResponse,
} from '~/modules/Arrange/utils/type';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { Room } from '~/modules/Setting/Rooms/util/type';
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
import { getRooms } from '~/services/distance';
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
}

export const ArrangeContext = createContext<ArrangeContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  ArrangeContext.displayName = 'ArrangeContext';
}

const ArrangeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [refresh, refetch] = useRefresh();

  const [executeId, setExecuteId] = useState<number>(0);
  const [lecturersTaskAssignInfo, setLecturersTaskAssignInfo] = useState<
    LecturerAssign[]
  >([]);
  const [tasksNotAssignedInfo, setTasksNotAssigned] =
    useState<TimeSlotResponse | null>(null);
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

  useEffect(() => {
    if (executeId) {
      getExecutedArrangeInfo(executeId);
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
    getLecturers().then((res) => {
      if (res.data) {
        setLecturers(res.data);
      }
    });

    getRooms().then((res) => {
      if (res.data) {
        setRooms(res.data);
      }
    });

    getSubjects().then((res) => {
      if (res.data) {
        setSubjects(res.data);
      }
    });

    getClasses().then((res) => {
      if (res.data) {
        setClasses(res.data);
      }
    });

    getTimeSlots().then((res) => {
      if (res.data && res.data.length > 0) {
        setTimeSlots(res.data || []);
      }
    });

    getExecuteInfos().then((res) => {
      if (res.data && res.data.length > 0) {
        setExecuteInfos(res.data || []);
      }
    });
  }, []);

  return (
    <ArrangeContext.Provider
      value={{
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
        setLoadingTimeTable,
        setLoadingTimeTableModify,
        refetch,
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
