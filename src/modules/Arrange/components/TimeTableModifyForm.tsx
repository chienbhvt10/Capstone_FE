import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import {
  lockAndUnLockTask,
  modifyTimetable,
  unLockAllTask,
} from '../../../services/arrange';
import SwapTimeTableForm from './SwapTimeTableForm';
import { Lecturer } from '~/modules/Setting/Lecturers/util/type';
import { getLecturers } from '~/services/lecturer';

const TimeTableModifyForm = () => {
  const {
    taskSelect,
    setTaskSelect,
    loadingTimeTableModify,
    refetch,
    semestersSelector,
  } = useArrange();
  const setNotification = useNotification();
  const [lecturerFilter, setLecturerFilter] = useState<Lecturer[]>([]);
  const [selectedLecturerIdSwap, setSelectedLecturerIdSwap] =
    useState<number>(0);

  useEffect(() => {
    getLecturers({
      lecturerId: taskSelect?.lecturerId || null,
      timeSlotId: taskSelect?.timeSlotId || null,
      subjectId: taskSelect?.subjectId || null,
      semesterId: semestersSelector?.id || 0,
    })
      .then((res) => {
        if (res.data) {
          setLecturerFilter(res.data);
        }
      })
      .finally(() => {
        setSelectedLecturerIdSwap(taskSelect?.lecturerId || 0);
      });
  }, [taskSelect, semestersSelector]);

  const onChangeLecturerSelect = (event: SelectChangeEvent<number>) => {
    if (taskSelect) {
      setSelectedLecturerIdSwap((event.target.value as number) || 0);
    }
  };

  const onModifyTimeTable = async () => {
    try {
      if (!taskSelect) {
        setNotification({ message: 'Select task first', severity: 'error' });
        return;
      }
      const res = await modifyTimetable({
        subjectId: taskSelect.subjectId || null,
        lecturerId: taskSelect.lecturerId || null,
        taskId: taskSelect?.taskId || null,
        roomId: taskSelect?.roomId || null,
        timeSlotId: taskSelect?.timeSlotId || null,
      });

      if (res.isSuccess) {
        refetch();
        setTaskSelect(null);
      } else {
        setNotification({
          message: res.message,
          severity: 'error',
        });
      }
    } catch (error) {
      setNotification({ message: 'Modify timetable error', severity: 'error' });
    }
  };

  const onPreAssignTask = (taskId: number, lecturerId: number) => () => {
    lockAndUnLockTask({ taskId, lecturerId })
      .then((res) => {
        refetch();
        setNotification({
          message: 'PreAssign task success',
          severity: 'success',
        });
      })
      .catch((err) =>
        setNotification({
          message: 'PreAssign task error',
          severity: 'error',
        })
      );
  };

  const onUnLockAll = () => {
    unLockAllTask()
      .then((res) => {
        refetch();
        setNotification({
          message: 'UnPreAssign all task success',
          severity: 'success',
        });
      })
      .catch((err) =>
        setNotification({
          message: 'UnPreAssign all task success',
          severity: 'error',
        })
      );
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        border: '1px solid #ccc',
        p: 2,
        borderRadius: 1,
        minWidth: 260,
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={1} sx={{ position: 'relative' }}>
          <Typography
            variant="body1"
            align="center"
            sx={{ fontWeight: 'bold' }}
          >
            Timetable Modify
          </Typography>
          <Divider variant="fullWidth" />
          {loadingTimeTableModify ? (
            <Box
              sx={{
                minHeight: 250,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Fragment>
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography variant="body2" sx={{ width: 80 }}>
                  Subject
                </Typography>
                <TextField
                  variant="outlined"
                  value={taskSelect?.subjectCode || ''}
                  disabled
                />
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography variant="body2" sx={{ width: 80 }}>
                  Class
                </Typography>
                <TextField
                  variant="outlined"
                  value={taskSelect?.className || ''}
                  disabled
                />
              </Stack>

              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography variant="body2" sx={{ width: 80 }}>
                  Lecturer
                </Typography>
                <Select
                  disabled={
                    !!selectedLecturerIdSwap && selectedLecturerIdSwap > 0
                  }
                  value={selectedLecturerIdSwap}
                  onChange={onChangeLecturerSelect}
                >
                  <MenuItem disabled value={0}>
                    <em style={{ fontSize: 14 }}>Select Lecturer</em>
                  </MenuItem>
                  {lecturerFilter?.length &&
                    lecturerFilter?.map((item) => (
                      <MenuItem key={Math.random()} value={item.id}>
                        {item.shortName}
                      </MenuItem>
                    ))}
                </Select>
              </Stack>
            </Fragment>
          )}
          <Button fullWidth onClick={onModifyTimeTable} size="medium">
            Modify TimeTable
          </Button>
          <Button
            fullWidth
            onClick={onPreAssignTask(
              taskSelect?.taskId || 0,
              taskSelect?.lecturerId || 0
            )}
            disabled={!taskSelect?.lecturerId || !!!taskSelect}
            size="medium"
          >
            Un/PreAssign Task
          </Button>
          <Button fullWidth onClick={onUnLockAll} size="medium">
            UnPreAssign All
          </Button>
        </Stack>
        <SwapTimeTableForm />
      </Stack>
    </Stack>
  );
};

export default TimeTableModifyForm;
