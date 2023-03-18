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
import images from '~/assets/images';
import Image from '~/components/styledComponents/Image';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import {
  executeArrange,
  lockAndUnLockTask,
  modifyTimetable,
  unLockAllTask,
} from '../../../services/arrange';
import SettingModelDialog from './SettingModelDialog';
import { Fragment, useState } from 'react';

const TimeTableModifyForm = () => {
  const {
    taskSelect,
    setTaskSelect,
    lecturers,
    rooms,
    refetch,
    loadingTimeTableModify,
  } = useArrange();
  const [openDialog, setOpen] = useState<boolean>(false);

  const setNotification = useNotification();

  const onChangeLecturerSelect = (event: SelectChangeEvent<number>) => {
    if (taskSelect) {
      setTaskSelect({
        ...taskSelect,
        lecturerId: (event.target.value as number) || 0,
      });
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

  const onModifyTimeTable = async () => {
    try {
      if (!taskSelect) {
        setNotification({ message: 'Select task before', severity: 'error' });
        return;
      }
      const res = await modifyTimetable({
        lecturerId: taskSelect?.lecturerId || null,
        taskId: taskSelect?.taskId || null,
        roomId: taskSelect?.roomId || null,
        timeSlotId: taskSelect?.timeSlotId || null,
      });

      if (res.isSuccess) {
        setNotification({
          message: 'Modify timetable success',
          severity: 'success',
        });
        refetch();
        return;
      }
      setNotification({ message: 'Modify timetable error', severity: 'error' });
    } catch (error) {
      setNotification({ message: 'Modify timetable error', severity: 'error' });
    }
  };

  const exportInImportFormat = () => {
    const url = 'https://localhost:7279/Timetable-20230306171426222.xlsx';
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Timetable-20230306171426222.xlsx');
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      })
      .catch((error) => console.log(error));
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

  const onCloseDialog = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        border: '1px solid #ccc',
        p: 2,
        borderRadius: 1,
        width: 250,
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="column" spacing={1}>
          <Typography variant="body1" align="center">
            Action
          </Typography>
          <Divider variant="fullWidth" />
          <Button
            startIcon={
              <Image
                src={images.iconArrange}
                sx={{ width: 25, height: 25 }}
                alt=""
              />
            }
            fullWidth
            onClick={onOpen}
          >
            Arrange
          </Button>
          <Button
            startIcon={
              <Image
                src={images.iconImport}
                sx={{ width: 18, height: 18 }}
                alt=""
              />
            }
            fullWidth
          >
            Import Timetable
          </Button>
          <Button
            onClick={exportInImportFormat}
            startIcon={
              <Image
                src={images.iconExport}
                sx={{ width: 18, height: 18 }}
                alt=""
              />
            }
            fullWidth
          >
            Export in import format
          </Button>
          <Button
            startIcon={
              <Image
                src={images.iconExport}
                sx={{ width: 18, height: 18 }}
                alt=""
              />
            }
            fullWidth
          >
            Export group by lecturer
          </Button>
        </Stack>
        <Stack direction="column" spacing={1} sx={{ position: 'relative' }}>
          <Typography variant="body1" align="center">
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
                  Room
                </Typography>
                <TextField
                  variant="outlined"
                  value={taskSelect?.roomName || ''}
                  disabled
                />
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography variant="body2" sx={{ width: 80 }}>
                  TimeSlot
                </Typography>
                <TextField
                  variant="outlined"
                  value={taskSelect?.timeSlotName || ''}
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
                  value={taskSelect?.lecturerId || 0}
                  onChange={onChangeLecturerSelect}
                >
                  <MenuItem disabled value={0}>
                    <em style={{ fontSize: 14 }}>Select Lecturer</em>
                  </MenuItem>
                  {lecturers &&
                    lecturers.length &&
                    lecturers?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.shortName}
                      </MenuItem>
                    ))}
                </Select>
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography variant="body2" sx={{ width: 80 }}>
                  Room
                </Typography>
                <Select
                  value={taskSelect?.roomId || 0}
                  onChange={onChangeRoomSelect}
                >
                  <MenuItem disabled value={0}>
                    <em style={{ fontSize: 14 }}>Select Room</em>
                  </MenuItem>
                  {rooms &&
                    rooms.length &&
                    rooms?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </Stack>
            </Fragment>
          )}
          <Button fullWidth onClick={onModifyTimeTable}>
            Edit
          </Button>
          <Button
            fullWidth
            onClick={onPreAssignTask(
              taskSelect?.taskId || 0,
              taskSelect?.lecturerId || 0
            )}
            disabled={!taskSelect?.lecturerId || !!!taskSelect}
          >
            Un/PreAssign Task
          </Button>
          <Button fullWidth onClick={onUnLockAll}>
            UnPreAssign All
          </Button>
        </Stack>
      </Stack>
      <SettingModelDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
      />
    </Stack>
  );
};

export default TimeTableModifyForm;
