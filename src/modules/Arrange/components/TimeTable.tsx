import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useMemo, useState } from 'react';
import TableCustom from '~/components/TableComponents/TableCustom';
import useArrange from '~/hooks/useArrange';
import wait from '~/utils/wait';
import {
  getATask,
  getTaskAssigned,
  getTaskNotAssign,
  lockAllTaskForLecturer,
  unlockAllTaskForLecturer,
} from '../../../services/arrange';
import { getTableTimeSlotColumns } from '../utils/column';
import { notAssignRows } from '../utils/row';
import useAuth from '~/hooks/useAuth';
import { Tooltip } from '@mui/material';
import { LecturerAssign } from '../utils/type';
import useNotification from '~/hooks/useNotification';

const TimeTable = () => {
  const theme = useTheme();
  const {
    lecturersTaskAssignInfo,
    tasksNotAssignedInfo,
    timeSlots,
    loadingTimeTable,
    semestersSelector,
    setTaskSelect,
    setLoadingTimeTableModify,
    refetch,
  } = useArrange();
  const { user } = useAuth();
  const setNotification = useNotification();
  const columns = useMemo(
    () => getTableTimeSlotColumns(timeSlots),
    [timeSlots]
  );

  const [maxLengthNotAssignSlot, setMaxLengthNotAssignSlot] =
    useState<number>(0);

  useEffect(() => {
    const lengthNotAssignSlot = notAssignRows.map((row) =>
      row.slots.map((slot) => slot.slotInfo?.length as number)
    )[0];

    const filterUndefinedInList = lengthNotAssignSlot.filter(
      (item) => item !== undefined
    );

    const maxLength = Math.max(...filterUndefinedInList);
    setMaxLengthNotAssignSlot(maxLength);
  }, [notAssignRows]);

  const onClickGetTaskDetails = (taskId: number) => async () => {
    if (taskId != 0) {
      try {
        setLoadingTimeTableModify(true);
        const res = await getATask({
          taskId: taskId,
          semesterId: semestersSelector?.id || null,
          departmentHeadId: user?.id || null,
        });
        await wait(300);
        if (res.data) {
          setTaskSelect(res.data);
        }
      } finally {
        setLoadingTimeTableModify(false);
      }
    }
  };

  const onPreAssignAllForLecturer = (item: LecturerAssign) => () => {
    lockAllTaskForLecturer({
      lecturerId: item?.lecturerId || null,
      semesterId: semestersSelector?.id || null,
      departmentHeadId: user?.id || null,
    })
      .then((res) => {
        if (res.isSuccess) {
          setNotification({
            message: 'PreAssign success',
            severity: 'success',
          });
          refetch();
        }
      })
      .catch((res) => {
        setNotification({ message: 'PreAssign error', severity: 'error' });
      });
  };

  const onUnPreAssignAllForLecturer = (item: LecturerAssign) => () => {
    unlockAllTaskForLecturer({
      lecturerId: item?.lecturerId || null,
      semesterId: semestersSelector?.id || null,
      departmentHeadId: user?.id || null,
    })
      .then((res) => {
        if (res.isSuccess) {
          setNotification({
            message: 'UnPreAssign success',
            severity: 'success',
          });
          refetch();
        }
      })
      .catch((res) => {
        setNotification({ message: 'UnPreAssign error', severity: 'error' });
      });
  };

  return (
    <TableContainer
      sx={{
        maxHeight: 550 + maxLengthNotAssignSlot * 40,
        position: 'relative',
        width: 0.98,
      }}
    >
      <TableCustom>
        <TableHead>
          <TableRow>
            {columns.map((item, index) => (
              <TableCell
                key={Math.random()}
                align={item.align}
                sx={{
                  border: '1px solid #ccc',
                  borderSpacing: '2px',
                  left: item.stickyPosition === 'left' ? 0 : 'unset',
                  right: item.stickyPosition === 'right' ? 0 : 'unset',
                  zIndex: item.zIndex
                    ? item.zIndex
                    : item.sticky
                    ? theme.zIndex.appBar + 10
                    : theme.zIndex.appBar,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: item.minWidth,
                    minHeight: item.minHeight,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loadingTimeTable ? (
          <Box sx={{ minHeight: 450 }}>
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                display: 'block',
              }}
            />
          </Box>
        ) : (
          <TableBody>
            {lecturersTaskAssignInfo?.length > 0 &&
              lecturersTaskAssignInfo.map((item) => (
                <TableRow role="checkbox" tabIndex={-1} key={Math.random()}>
                  <TableCell
                    align="center"
                    sx={{
                      border: '1px solid #ccc',
                      left: 0,
                      position: 'sticky',
                      zIndex: theme.zIndex.appBar,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    <Box
                      sx={{
                        minHeight: 60,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      <Tooltip
                        title="PreAssign all task for Lecturer"
                        placement="right"
                      >
                        <IconButton
                          onClick={onPreAssignAllForLecturer(item)}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: -5,
                            width: 20,
                            height: 20,
                            color: '#3DA2FF',
                          }}
                        >
                          <LockIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="UnPreAssign all task for Lecturer"
                        placement="right"
                      >
                        <IconButton
                          onClick={onUnPreAssignAllForLecturer(item)}
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: -5,
                            width: 20,
                            height: 20,
                            color: '#3DA2FF',
                          }}
                        >
                          <LockOpenIcon />
                        </IconButton>
                      </Tooltip>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.lecturerName}
                      </Typography>
                    </Box>
                  </TableCell>

                  {item?.timeSlotInfos.length > 0 &&
                    item.timeSlotInfos.map((task, index) => (
                      <Fragment key={Math.random()}>
                        <TableCell
                          align="center"
                          sx={{
                            border: '1px solid #ccc',
                            backgroundColor: task.preAssign
                              ? '#bbdfff'
                              : '#fff',
                            '&:hover': {
                              backgroundColor: '#DDF5FF',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          <Box
                            onClick={onClickGetTaskDetails(task.taskId)}
                            key={task.timeSlotName}
                            sx={{
                              minHeight: 60,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              textDecoration: 'none',
                              color: '#000',
                              position: 'relative',
                            }}
                          >
                            {task.preAssign && (
                              <LockIcon
                                sx={{
                                  position: 'absolute',
                                  top: -5,
                                  right: -5,
                                  width: 15,
                                  height: 15,
                                  color: '#3DA2FF',
                                }}
                              />
                            )}
                            <Fragment>
                              <Typography
                                variant="body2"
                                sx={{ margin: '0 auto' }}
                              >
                                {task.className}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ margin: '0 auto' }}
                              >
                                {task.subjectCode}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'primary.dark',
                                  margin: '0 auto',
                                }}
                              >
                                {task.roomName}
                              </Typography>
                            </Fragment>
                          </Box>
                        </TableCell>
                      </Fragment>
                    ))}

                  <TableCell
                    align="center"
                    sx={{
                      border: '1px solid #ccc',
                      right: 0,
                      position: 'sticky',
                      zIndex: theme.zIndex.appBar,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    <Box
                      sx={{
                        minHeight: 40,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.total}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            {tasksNotAssignedInfo && (
              <TableRow
                role="checkbox"
                tabIndex={-1}
                sx={{
                  bottom: 0,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    border: '1px solid #ccc',
                    left: 0,
                    position: 'sticky',
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: theme.palette.background.paper,
                    verticalAlign: 'top',
                  }}
                >
                  <Box
                    sx={{
                      minHeight: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      NOT_ASSIGNED
                    </Typography>
                  </Box>
                </TableCell>
                {tasksNotAssignedInfo?.timeSlotInfos &&
                  tasksNotAssignedInfo?.timeSlotInfos.length > 0 &&
                  tasksNotAssignedInfo.timeSlotInfos.map((task) => (
                    <Fragment key={Math.random()}>
                      <TableCell
                        align="center"
                        sx={{
                          border: '1px solid #ccc',
                          verticalAlign: 'top',
                        }}
                      >
                        {task?.length > 0 &&
                          task.map((item) => (
                            <Box
                              onClick={onClickGetTaskDetails(item.taskId)}
                              key={Math.random()}
                              sx={{
                                py: 0.5,
                                minHeight: 70,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                textDecoration: 'none',
                                color: '#000',
                                '&:hover': {
                                  backgroundColor: '#DDF5FF',
                                  cursor: 'pointer',
                                },
                              }}
                            >
                              <Fragment>
                                <Typography
                                  variant="body2"
                                  align="center"
                                  sx={{ margin: '0 auto' }}
                                >
                                  {item.className}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  align="center"
                                  sx={{ margin: '0 auto' }}
                                >
                                  {item.subjectCode}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  align="center"
                                  sx={{
                                    color: 'primary.dark',
                                    margin: '0 auto',
                                  }}
                                >
                                  {item.roomName}
                                </Typography>
                              </Fragment>
                            </Box>
                          ))}
                      </TableCell>
                    </Fragment>
                  ))}

                <TableCell
                  align="center"
                  sx={{
                    border: '1px solid #ccc',
                    right: 0,
                    position: 'sticky',
                    zIndex: theme.zIndex.appBar,
                    backgroundColor: theme.palette.background.paper,
                    verticalAlign: 'top',
                  }}
                >
                  <Box
                    sx={{
                      minHeight: 40,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {tasksNotAssignedInfo && tasksNotAssignedInfo?.total}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </TableCustom>
    </TableContainer>
  );
};

export default TimeTable;
