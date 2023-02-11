import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { timeTableColumns } from '../utils/column';
import { assignedRows, notAssignRows } from '../utils/row';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';

interface Props {}

const TimeTable = (props: Props) => {
  const theme = useTheme();
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

  const onClickGetDetails = () => {};

  return (
    <TableContainer sx={{ maxHeight: 550 + maxLengthNotAssignSlot * 40 }}>
      <Table
        stickyHeader
        aria-label="sticky table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            px: 1,
          },
          [`& th.${tableCellClasses.root}`]: {
            p: 2,
          },
        }}
      >
        <TableHead>
          <TableRow>
            {timeTableColumns.map((item) => (
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
          {assignedRows.map((item, index) => (
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
                    {item.lecturer}
                  </Typography>
                </Box>
              </TableCell>
              {item.slots.map((slot, index) => (
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
                    {slot.slotInfo &&
                      slot.slotInfo?.length > 0 &&
                      slot?.slotInfo?.map((item, index) => (
                        <Box
                          component="a"
                          href="#scroll-filter-form"
                          key={index + slot.code}
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
                            <Typography variant="body2" align="left">
                              {item.class}
                            </Typography>
                            <Typography variant="body2" align="left">
                              {item.subject}
                            </Typography>
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{ color: 'primary.dark' }}
                            >
                              {item.room}
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
                    {item.total}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {notAssignRows.map((item, index) => (
            <TableRow
              role="checkbox"
              tabIndex={-1}
              key={index + 1}
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
                    {item.lecturer}
                  </Typography>
                </Box>
              </TableCell>
              {item.slots.map((slot, index) => (
                <Fragment key={index}>
                  <TableCell
                    align="center"
                    sx={{
                      border: '1px solid #ccc',
                    }}
                  >
                    {slot.slotInfo &&
                      slot.slotInfo?.length > 0 &&
                      slot?.slotInfo?.map((item, index) => (
                        <Box
                          component="a"
                          href="#scroll-filter-form"
                          key={index + slot.code}
                          sx={{
                            p: 0.5,
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
                            <Typography variant="body2" align="left">
                              {item.class}
                            </Typography>
                            <Typography variant="body2" align="left">
                              {item.subject}
                            </Typography>
                            <Typography
                              variant="body2"
                              align="left"
                              sx={{ color: 'primary.dark' }}
                            >
                              {item.room}
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
                    {item.total}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeTable;
