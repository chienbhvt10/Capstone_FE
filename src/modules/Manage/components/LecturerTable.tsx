import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { lecturerTableColumns } from '../utils/column';
import { timeTableRows } from '../utils/row';
import { EXPECTED_COMPLETED, STATUS_ACTIVE } from '../const';
import { Paper, TablePagination } from '@mui/material';

interface Props {}

const LecturerTable = (props: Props) => {
  return (
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
                <Typography variant="body2" align="left">
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
                  sx={{
                    border:
                      item.expected === EXPECTED_COMPLETED
                        ? '1px solid green'
                        : '1px solid red',
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={10}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </TableContainer>
  );
};

export default LecturerTable;
