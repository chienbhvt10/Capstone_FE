import {
  Backdrop,
  Box,
  CircularProgress,
  LinearProgress,
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
  exportInImportFormat,
  importTimeTable,
  lockAndUnLockTask,
  modifyTimetable,
  unLockAllTask,
} from '../../../services/arrange';
import SettingModelDialog from './SettingModelDialog';
import { Fragment, useEffect, useState } from 'react';
import UploadExcelButton from '~/components/ButtonComponents/UploadExcelButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const TimeTableModifyForm = () => {
  const {
    taskSelect,
    setTaskSelect,
    setTasksNotAssigned,
    tasksNotAssignedInfo,
    lecturers,
    rooms,
    refetch,
    loadingTimeTableModify,
    lecturersTaskAssignInfo,
    setLecturersTaskAssignInfo,
  } = useArrange();
  const [openDialog, setOpen] = useState<boolean>(false);
  const setNotification = useNotification();
  const [loadingUploadExcel, setLoadingUploadExcel] = useState<boolean>(false);
  const [lecturerIdSelect, setLecturerIdSelect] = useState<number>(0);

  useEffect(() => {
    setLecturerIdSelect(taskSelect?.lecturerId || 0);
  }, [taskSelect]);

  const onChangeLecturerSelect = (event: SelectChangeEvent<number>) => {
    setLecturerIdSelect((event.target.value as number) || 0);
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
        lecturerId: lecturerIdSelect || null,
        taskId: taskSelect?.taskId || null,
        roomId: taskSelect?.roomId || null,
        timeSlotId: taskSelect?.timeSlotId || null,
      });

      console.log(res.data);
      if (res.isSuccess && res.data) {
        const taskNeedAssign = res.data.taskNeedAssign;
        const taskSameTimeSlot = res.data.taskSameTimeSlot;
        if (taskNeedAssign) {
          const newLecturerTaskAssign = lecturersTaskAssignInfo.map((task) => {
            console.log(task.lecturerId, taskSelect.lecturerId);
            if (task.lecturerId === taskNeedAssign.lecturerId) {
              const newTimeSlotInfos = task.timeSlotInfos.map((timeSlot) => {
                if (timeSlot.timeSlotId === taskNeedAssign.timeSlotId) {
                  return {
                    ...timeSlot,
                    classId: taskNeedAssign.classId,
                    className: taskNeedAssign.className,
                    subjectId: taskNeedAssign.subjectId,
                    subjectCode: taskNeedAssign.subjectName,
                    timeSlotId: taskNeedAssign.timeSlotId,
                    timeSlotName: taskNeedAssign.timeSlotName,
                    taskId: taskNeedAssign.taskId,
                    roomId: taskNeedAssign.roomId,
                    roomName: taskNeedAssign.roomName,
                  };
                }
                return timeSlot;
              });
              return {
                ...task,
                lecturerId: taskNeedAssign.lecturerId,
                lecturerName: taskNeedAssign.lecturerName,
                timeSlotInfos: newTimeSlotInfos,
                total: typeof task.total === 'number' ? task.total + 1 : 0,
              };
            }
            if (task.lecturerId === taskSelect.lecturerId) {
              if (taskSameTimeSlot) {
                console.log(taskSameTimeSlot);
                const newTimeSlotInfos = task.timeSlotInfos.map((timeSlot) => {
                  if (timeSlot.timeSlotId === taskSameTimeSlot.timeSlotId) {
                    return {
                      ...timeSlot,
                      classId: taskSameTimeSlot.classId,
                      className: taskSameTimeSlot.className,
                      subjectId: taskSameTimeSlot.subjectId,
                      subjectCode: taskSameTimeSlot.subjectName,
                      timeSlotId: taskSameTimeSlot.timeSlotId,
                      timeSlotName: taskSameTimeSlot.timeSlotName,
                      taskId: taskSameTimeSlot.taskId,
                      roomId: taskSameTimeSlot.roomId,
                      roomName: taskSameTimeSlot.roomName,
                    };
                  }
                  return timeSlot;
                });
                return {
                  ...task,
                  lecturerId: taskSameTimeSlot.lecturerId,
                  lecturerName: taskSameTimeSlot.lecturerName,
                  timeSlotInfos: newTimeSlotInfos,
                  total: task.total && task.total + 1,
                };
              } else {
                const newTimeSlotInfos = task.timeSlotInfos.map((timeSlot) => {
                  if (timeSlot.timeSlotId === taskSelect.timeSlotId) {
                    return {
                      ...timeSlot,
                      classId: 0,
                      className: '',
                      subjectId: 0,
                      subjectCode: '',
                      taskId: 0,
                      roomId: 0,
                      roomName: '',
                    };
                  }
                  return timeSlot;
                });
                return {
                  ...task,
                  timeSlotInfos: newTimeSlotInfos,
                  total: task.total && task.total > 0 ? task.total - 1 : 0,
                };
              }
            }

            return task;
          });

          setTasksNotAssigned(
            tasksNotAssignedInfo
              ? {
                  ...tasksNotAssignedInfo,
                  total:
                    typeof tasksNotAssignedInfo?.total === 'number'
                      ? tasksNotAssignedInfo?.total - 1
                      : 0,
                }
              : null
          );

          setLecturersTaskAssignInfo(newLecturerTaskAssign);
        }
      }
    } catch (error) {
      setNotification({ message: 'Modify timetable error', severity: 'error' });
    }
  };

  const onExportInImportFormat = async () => {
    const res = await exportInImportFormat();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Timetable.xlsx');
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  };

  const onPreAssignTask = (taskId: number, lecturerId: number) => () => {
    lockAndUnLockTask({ taskId, lecturerId })
      .then((res) => {
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

  const handleUploadExcel = async (file: File) => {
    try {
      setLoadingUploadExcel(true);
      const formData = new FormData();

      formData.append('file', file, file.name);

      await importTimeTable(formData);
      setNotification({
        message: 'Upload file success',
        severity: 'success',
      });
      refetch();
    } catch (error) {
      setNotification({
        message: 'Upload file failed',
        severity: 'error',
      });
    } finally {
      setLoadingUploadExcel(false);
    }
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
          <UploadExcelButton
            onSelect={handleUploadExcel}
            title="Import Timetable"
          />

          <Button
            onClick={onExportInImportFormat}
            startIcon={<FileDownloadIcon />}
            fullWidth
          >
            Export in import format
          </Button>

          <Button startIcon={<FileDownloadIcon />} fullWidth>
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
                  value={lecturerIdSelect}
                  onChange={onChangeLecturerSelect}
                >
                  <MenuItem disabled value={0}>
                    <em style={{ fontSize: 14 }}>Select Lecturer</em>
                  </MenuItem>
                  {lecturers.length &&
                    lecturers?.map((item) => (
                      <MenuItem key={Math.random()} value={item.id}>
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
                  {rooms.length &&
                    rooms?.map((item) => (
                      <MenuItem key={Math.random()} value={item.id}>
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
      <Backdrop
        sx={{
          color: '#fff',
          mt: '0 !important',
          zIndex: 9999,
        }}
        open={loadingUploadExcel}
      >
        <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress sx={{ color: 'white' }} />
          <Typography variant="body1">Importing timetable ...</Typography>
        </Stack>
      </Backdrop>
    </Stack>
  );
};

export default TimeTableModifyForm;
