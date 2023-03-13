import { createContext, useState } from 'react';
import {
  LecturerAssign,
  TimeSlotLecturer,
  TimeSlotResponse,
} from '~/modules/Arrange/utils/type';

export interface ArrangeContextValue {
  lecturersTaskAssignInfo: LecturerAssign[];
  setLecturersTaskAssignInfo: React.Dispatch<
    React.SetStateAction<LecturerAssign[]>
  >;
  tasksNotAssignedInfo: Array<Array<TimeSlotLecturer>> | null;
  setTasksNotAssigned: React.Dispatch<React.SetStateAction<any>>;
  timeSlots: TimeSlotResponse[];
  setTimeSlots: React.Dispatch<any>;
}

export const ArrangeContext = createContext<ArrangeContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  ArrangeContext.displayName = 'ArrangeContext';
}

const ArrangeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [lecturersTaskAssignInfo, setLecturersTaskAssignInfo] = useState<
    LecturerAssign[]
  >([]);
  const [tasksNotAssignedInfo, setTasksNotAssigned] = useState<Array<
    Array<TimeSlotLecturer>
  > | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlotResponse[]>([]);

  return (
    <ArrangeContext.Provider
      value={{
        lecturersTaskAssignInfo,
        setLecturersTaskAssignInfo,
        setTasksNotAssigned,
        tasksNotAssignedInfo,
        setTimeSlots,
        timeSlots,
      }}
    >
      {children}
    </ArrangeContext.Provider>
  );
};

const ArrangeConsumer = ArrangeContext.Consumer;
export { ArrangeConsumer, ArrangeProvider, ArrangeContext as default };
