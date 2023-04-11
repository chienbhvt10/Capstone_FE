import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
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
import { getATask } from '../../../services/arrange';
import { getTableTimeSlotColumns } from '../utils/column';
import { notAssignRows } from '../utils/row';

const TimeTable = () => {
  const theme = useTheme();
  const {
    lecturersTaskAssignInfo,
    tasksNotAssignedInfo,
    timeSlots,
    loadingTimeTable,
    setTaskSelect,
    setLoadingTimeTableModify,
  } = useArrange();

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
        const res = await getATask(taskId);
        await wait(300);
        if (res.data) {
          setTaskSelect(res.data);
        }
      } finally {
        setLoadingTimeTableModify(false);
      }
    }
  };

  return (
    <TableContainer
      sx={{
        maxHeight: 550 + maxLengthNotAssignSlot * 40,
        position: 'relative',
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
              lecturersTaskAssignInfo.map((item, index) => (
                <TableRow role="checkbox" tabIndex={-1} key={Math.random()}>
                  <TableCell
                    align="center"
                    sx={{
                      border: '1px solid #ccc',
                      left: 0,
                      position: 'sticky',
                      zIndex: theme.zIndex.appBar,
                      backgroundColor: theme.palette.background.paper,
                      '&:hover': {
                        backgroundColor: '#DDF5FF',
                        cursor: 'pointer',
                      },
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
          </TableBody>
        )}
      </TableCustom>
    </TableContainer>
  );
};

export default TimeTable;
