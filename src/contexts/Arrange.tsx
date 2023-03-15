import { createContext, useState, useEffect } from 'react';
import useRefresh from '~/hooks/useRefresh';
import {
  getExecutedArrangeInfo,
  getTaskNotAssign,
} from '~/modules/Arrange/services';
import {
  LecturerAssign,
  TaskDetail,
  TimeSlot,
  TimeSlotResponse,
} from '~/modules/Arrange/utils/type';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { Room } from '~/modules/Setting/Rooms/util/type';

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

  useEffect(() => {
    getExecutedArrangeInfo(executeId).then((res) => {
      if (res.data && res.data.length > 0) {
        setLecturersTaskAssignInfo(res.data);
      }
    });

    getTaskNotAssign().then((res) => {
      if (
        res.data &&
        res.data.timeSlotInfos &&
        res.data.timeSlotInfos.length > 0
      ) {
        setTasksNotAssigned(res.data);
      }
    });
  }, [executeId, refresh]);

  return (
    <ArrangeContext.Provider
      value={{
        rooms,
        executeId,
        lecturers,
        timeSlots,
        taskSelect,
        tasksNotAssignedInfo,
        lecturersTaskAssignInfo,
        refetch,
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
