import {
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
import { Fragment, useEffect, useState } from 'react';
import UploadExcelButton from '~/components/ButtonComponents/UploadExcelButton';
import Image from '~/components/styledComponents/Image';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';
import useNotification from '~/hooks/useNotification';
import { Lecturer } from '~/modules/Setting/Lecturers/util/type';
import { getLecturers } from '~/services/lecturer';
import {
  importTimeTable,
  importTimeTableResult,
  lockAndUnLockTask,
  modifyTimetable,
  unLockAllTask,
} from '../../../services/arrange';
import SwapTimeTableForm from './SwapTimeTableForm';

import { Backdrop } from '@mui/material';
import images from '~/assets/images';
import SettingModelDialog from './SettingModelDialog';
const TimeTableModifyForm = () => {
  const {
    taskSelect,
    setTaskSelect,
    loadingTimeTableModify,
    refetch,
    currentSemester,
    semestersSelector,
  } = useArrange();
  const { user } = useAuth();
  const [lecturerFilter, setLecturerFilter] = useState<Lecturer[]>([]);
  const [selectedLecturerIdSwap, setSelectedLecturerIdSwap] =
    useState<number>(0);
  const [loadingSelectLecturer, setLoadingSelectLecturer] =
    useState<boolean>(false);
  const [openDialog, setOpen] = useState<boolean>(false);
  const [loadingUploadExcel, setLoadingUploadExcel] = useState<boolean>(false);
  const setNotification = useNotification();

  const onCloseDialog = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

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
            setLecturerFilter(res.data);
          }
        })
        .finally(() => {
          setSelectedLecturerIdSwap(taskSelect?.lecturerId || 0);
          setLoadingSelectLecturer(false);
        });
    }
  }, [taskSelect, semestersSelector, user]);

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
        lecturerId: selectedLecturerIdSwap || null,
        taskId: taskSelect?.taskId || null,
      });

      if (res.isSuccess) {
        refetch();
        setTaskSelect(null);
        setNotification({
          message: res.message,
          severity: 'success',
        });
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

  const handleImportTimeTable = async (file: File) => {
    try {
      setLoadingUploadExcel(true);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('semesterId', String(currentSemester?.id || 0));
      formData.append('departmentHeadId', String(user?.id || 0));

      const res = await importTimeTable(formData);
      if (!res.isSuccess) {
        setNotification({
          message: res.message,
          severity: 'error',
        });
        return;
      }
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

  const handleResults = async (file: File) => {
    try {
      setLoadingUploadExcel(true);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('semesterId', String(currentSemester?.id || 0));
      formData.append('departmentHeadId', String(user?.id || 0));

      const res = await importTimeTableResult(formData);
      if (!res.isSuccess) {
        setNotification({
          message: res.message,
          severity: 'error',
        });
        return;
      }
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
  const onRemoveAssigned = async () => {
    try {
      if (!taskSelect) {
        setNotification({ message: 'Select task first', severity: 'error' });
        return;
      }
      const res = await modifyTimetable({
        lecturerId: null,
        taskId: taskSelect?.taskId || null,
      });

      if (res.isSuccess) {
        refetch();
        setTaskSelect(null);
        setNotification({
          message: res.message,
          severity: 'success',
        });
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
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        border: '1px solid #ccc',
        p: 2,
        borderRadius: 1,
        maxWidth: 260,
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="column" sx={{ position: 'relative' }}>
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
                minHeight: 180,
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
                {loadingSelectLecturer ? (
                  <LinearProgress sx={{ width: 1 }} />
                ) : (
                  <Select
                    disabled={
                      (!!selectedLecturerIdSwap &&
                        selectedLecturerIdSwap > 0) ||
                      !taskSelect
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
                )}
              </Stack>
            </Fragment>
          )}
          <Button
            fullWidth
            onClick={onModifyTimeTable}
            size="medium"
            disabled={!!taskSelect?.lecturerId}
            sx={{ mb: 1 }}
          >
            Modify TimeTable
          </Button>
          <Button
            disabled={!taskSelect?.lecturerId}
            fullWidth
            onClick={onRemoveAssigned}
            size="medium"
          >
            Remove Assigned
          </Button>
          <SwapTimeTableForm />
          <Button
            fullWidth
            onClick={onPreAssignTask(
              taskSelect?.taskId || 0,
              taskSelect?.lecturerId || 0
            )}
            disabled={!taskSelect?.lecturerId || !!!taskSelect}
            size="medium"
            sx={{ mt: 3 }}
          >
            Un/PreAssign Task
          </Button>
          <Button fullWidth onClick={onUnLockAll} size="medium">
            UnPreAssign All
          </Button>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography
            variant="body1"
            align="center"
            sx={{ fontWeight: 'bold' }}
          >
            Excel
          </Typography>
          <Divider variant="fullWidth" />
          <UploadExcelButton
            sx={{ p: 0.5 }}
            onSelect={handleImportTimeTable}
            title="Import timetable"
          />
          <UploadExcelButton
            sx={{ p: 0.5 }}
            onSelect={handleResults}
            title="Import results"
          />
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
