import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import {
  EXPECTED_COMPLETED,
  EXPECTED_UNCOMPLETED,
  STATUS_ACTIVE,
} from '../const';
import { lecturerTableColumns } from '../utils/column';
import { timeTableRows } from '../utils/row';
import { Row } from '../utils/type';
import DetailLecturerPopup from './DetailLecturerPopup';
import ExpectedPriorityPopup from './ExpectedPriorityPopup';

interface Props {}

const LecturerTable = (props: Props) => {
  const [openDetailPopup, setOpenDetailPopup] = useState<boolean>(false);
  const [openExpectedPriorityPopup, setOpenExpectedPriorityPopup] =
    useState<boolean>(false);

  const [itemShow, setItemShow] = useState<Row | null>(null);

  const onShowDetailPopup = (item: Row) => () => {
    setOpenDetailPopup(true);
    setItemShow(item);
  };

  const onCloseDetailLecturerPopup = () => {
    setOpenDetailPopup(false);
  };

  const onShowExpectedPriorityPopup = (item: Row) => () => {
    if (item.expected === EXPECTED_UNCOMPLETED) {
      setOpenExpectedPriorityPopup(true);
      setItemShow(item);
    }
  };

  const onCloseExpectedPriorityPopup = () => {
    setOpenExpectedPriorityPopup(false);
  };

  return (
    <Fragment>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {lecturerTableColumns.map((item) => (
                <TableCell key={item.id} align={item.align}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: item.minWidth,
                      minHeight: item.minHeight,
                    }}
                  >
                    {item.label}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeTableRows.map((item, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Typography variant="body2" align="center">
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Typography
                    variant="body2"
                    align="left"
                    color="primary.main"
                    sx={{ cursor: 'pointer' }}
                    onClick={onShowDetailPopup(item)}
                  >
                    {item.email}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Typography variant="body2" align="left">
                    {item.fullName}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Typography variant="body2" align="left">
                    {item.shortName}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Typography
                    variant="body2"
                    align="center"
                    onClick={onShowExpectedPriorityPopup(item)}
                    sx={{
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor:
                        item.expected === EXPECTED_COMPLETED ? 'green' : 'red',
                      color:
                        item.expected === EXPECTED_COMPLETED ? 'green' : 'red',
                    }}
                  >
                    {item.expected}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      color: item.status === STATUS_ACTIVE ? 'green' : 'red',
                    }}
                  >
                    {item.status}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ justifyContent: 'center' }}
                  >
                    <Button>Tranfer Position</Button>
                    <Button variant="outlined">Deactive</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DetailLecturerPopup
          open={openDetailPopup}
          onCloseDetailLecturerPopup={onCloseDetailLecturerPopup}
          itemShow={itemShow}
        />
        <ExpectedPriorityPopup
          open={openExpectedPriorityPopup}
          onCloseExpectedPriorityPopup={onCloseExpectedPriorityPopup}
        />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        SelectProps={{ sx: { maxWidth: 50 } }}
      />
    </Fragment>
  );
};

export default LecturerTable;
