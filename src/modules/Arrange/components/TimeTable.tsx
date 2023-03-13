import Box from '@mui/material/Box';
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
import { getTimeSlot } from '~/modules/Setting/services/timeslot';
import { notAssignRows } from '../utils/row';
import { Column } from '../utils/type';
import { getTableTimeSlotColumns } from '../utils/column';

interface Props {}

const TimeTable = (props: Props) => {
  const theme = useTheme();
  const {
    lecturersTaskAssignInfo,
    tasksNotAssignedInfo,
    timeSlots,
    setTimeSlots,
  } = useArrange();

  const columns = useMemo(
    () => getTableTimeSlotColumns(timeSlots),
    [timeSlots]
  );

  const [maxLengthNotAssignSlot, setMaxLengthNotAssignSlot] =
    useState<number>(0);

  useEffect(() => {
    getTimeSlot().then((res) => {
      if (res.data && res.data.length > 0) {
        setTimeSlots(res.data);
      }
    });
  }, []);

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

  const onClickGetDetails = () => {};

  return (
    <TableContainer sx={{ maxHeight: 550 + maxLengthNotAssignSlot * 40 }}>
      <TableCustom>
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell
                key={item.id}
                align={item.align}
                sx={{
                  left: item.stickyPosition === 'left' ? 0 : 'unset',
                  right: item.stickyPosition === 'right' ? 0 : 'unset',
                  zIndex: item.sticky
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
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {lecturersTaskAssignInfo?.length > 0 &&
            lecturersTaskAssignInfo.map((item, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={index + 1}>
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
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.lecturerName}
                    </Typography>
                  </Box>
                </TableCell>
                {item?.timeSlotInfos &&
                  item?.timeSlotInfos.length > 0 &&
                  item.timeSlotInfos.map((task, index) => (
                    <Fragment key={index}>
                      <TableCell
                        align="center"
                        sx={{
                          border: '1px solid #ccc',
                          '&:hover': {
                            backgroundColor: '#DDF5FF',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <Box
                          key={task.timeSlotName}
                          sx={{
                            minHeight: 60,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            textDecoration: 'none',
                            color: '#000',
                          }}
                        >
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
                              {task.subjectName}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: 'primary.dark', margin: '0 auto' }}
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
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {111}
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
              position: 'sticky',
              zIndex: theme.zIndex.appBar,
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
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  NOT_ASSIGNED
                </Typography>
              </Box>
            </TableCell>
            {tasksNotAssignedInfo?.length &&
              tasksNotAssignedInfo?.length > 0 &&
              tasksNotAssignedInfo.map((task, index) => (
                <Fragment key={index}>
                  <TableCell
                    align="center"
                    sx={{
                      border: '1px solid #ccc',
                      verticalAlign: 'top',
                    }}
                  >
                    {task.map((item) => (
                      <Box
                        key={item.timeSlotId + item.taskId}
                        sx={{
                          minHeight: 60,
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
                            {item.subjectName}
                          </Typography>
                          <Typography
                            variant="body2"
                            align="center"
                            sx={{ color: 'primary.dark', margin: '0 auto' }}
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
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {tasksNotAssignedInfo && tasksNotAssignedInfo?.length}
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </TableCustom>
    </TableContainer>
  );
};

export default TimeTable;
