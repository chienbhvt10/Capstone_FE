import {
  Box,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';
import useNotification from '~/hooks/useNotification';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { modifyTimetable, swapLecturer, swapRoom } from '~/services/arrange';
import { getLecturers } from '~/services/lecturer';

interface Props {}

const SwapTimeTableForm = (props: Props) => {
  const { user } = useAuth();
  const {
    taskSelect,
    setTaskSelect,
    semestersSelector,
    rooms,
    currentSemester,
    refetch,
  } = useArrange();
  const setNotification = useNotification();
  const [lecturerFilter, setLecturerFilter] = useState<Lecturer[]>([]);
  const [selectedLecturerIdSwap, setSelectedLecturerIdSwap] =
    useState<number>(0);
  const [loadingSelectLecturer, setLoadingSelectLecturer] =
    useState<boolean>(false);

  useEffect(() => {
    if (semestersSelector && user && taskSelect) {
      setLoadingSelectLecturer(true);
      getLecturers({
        lecturerId: taskSelect?.lecturerId || null,
        timeSlotId: taskSelect?.timeSlotId || null,
        subjectId: taskSelect?.subjectId || null,
        semesterId: semestersSelector?.id || 0,
        departmentHeadId: user?.id || 0,
      })
        .then((res) => {
          if (res.data) {
            setLecturerFilter(
              res.data.filter((item) => item.id != taskSelect?.lecturerId) || []
            );
          }
        })
        .finally(() => {
          setLoadingSelectLecturer(false);
        });
    }
  }, [taskSelect, semestersSelector, user]);

  const onChangeLecturerSelect = (event: SelectChangeEvent<number>) => {
    if (taskSelect) {
      setSelectedLecturerIdSwap((event.target.value as number) || 0);
    }
  };
  const onChangeRoomSelect = (event: SelectChangeEvent<number>) => {
    if (taskSelect) {
      setTaskSelect({
        ...taskSelect,
        roomId: (event.target.value as number) || 0,
      });
    }
  };

  const onSwapLecturer = () => {
    if (!taskSelect) {
      setNotification({ message: 'Select task first', severity: 'error' });
      return;
    }
    swapLecturer({
      lecturerId: selectedLecturerIdSwap || 0,
      taskId: taskSelect?.taskId || 0,
      timeSlotId: taskSelect?.timeSlotId || 0,
      departmentHeadId: user?.id || 0,
      semesterId: currentSemester?.id || 0,
    })
      .then((res) => {
        if (!res.isSuccess) {
          setNotification({ message: res.message, severity: 'error' });
          return;
        }
        setNotification({ message: res.message, severity: 'success' });
        refetch();
      })
      .catch((err) => {
        setNotification({ message: 'Swap error', severity: 'error' });
      });
  };

  const onSwapRoom = () => {
    if (!taskSelect) {
      setNotification({ message: 'Select task first', severity: 'error' });
      return;
    }
    swapRoom({
      roomId: selectedLecturerIdSwap || 0,
      taskId: taskSelect?.taskId || 0,
      departmentHeadId: user?.id || 0,
      semesterId: currentSemester?.id || 0,
    })
      .then((res) => {
        if (!res.isSuccess) {
          setNotification({ message: res.message, severity: 'error' });
          return;
        }
        setNotification({ message: res.message, severity: 'success' });
        refetch();
      })
      .catch((err) => {
        setNotification({ message: 'Swap error', severity: 'error' });
      });
  };

  return (
    <Stack direction="column" spacing={2} sx={{ position: 'relative', mt: 2 }}>
      <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>
        Swap Timetable
      </Typography>
      <Divider variant="fullWidth" />
      <Stack
        direction="row"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="body2" sx={{ width: 80 }}>
          Lecturer
        </Typography>
        {loadingSelectLecturer ? (
          <LinearProgress sx={{ width: 1 }} />
        ) : (
          <Select
            disabled={!taskSelect?.lecturerId}
            value={selectedLecturerIdSwap || 0}
            onChange={onChangeLecturerSelect}
          >
            <MenuItem disabled value={0}>
              <em style={{ fontSize: 14 }}>Select Lecturer</em>
            </MenuItem>
            {lecturerFilter.length &&
              lecturerFilter?.map((item) => (
                <MenuItem key={Math.random()} value={item.id}>
                  {item.shortName}
                </MenuItem>
              ))}
          </Select>
        )}
      </Stack>

      <Button fullWidth onClick={onSwapLecturer} size="medium">
        Swap Lecturer
      </Button>

      {/* <Stack
        direction="row"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="body2" sx={{ width: 80 }}>
          Room
        </Typography>
        <Select
          disabled={!taskSelect?.lecturerId}
          value={taskSelect?.roomId || 0}
          onChange={onChangeRoomSelect}
        >
          <MenuItem disabled value={0}>
            <em style={{ fontSize: 14 }}>Select Room</em>
          </MenuItem>
          {rooms.length &&
            rooms?.map((item) => (
              <MenuItem key={Math.random()} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </Stack>

      <Button fullWidth onClick={onSwapRoom} size="medium">
        Swap Room
      </Button> */}
    </Stack>
  );
};

export default SwapTimeTableForm;
