import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { timeTableColumns } from '../utils/column';
import { timeTableRows } from '../utils/row';

interface Props {}

const TimeTable = (props: Props) => {
  return (
    <TableContainer sx={{ maxWidth: 1100 }}>
      <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: 2 }}>
        <TableHead>
          <TableRow>
            {timeTableColumns.map((item) => (
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
            <TableRow hover role="checkbox" tabIndex={-1} key={index + 1}>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 80,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1">
                    {item.firstColumn.slot}
                  </Typography>
                  <Typography variant="body2">
                    {item.firstColumn.time}
                  </Typography>
                </Box>
              </TableCell>
              {item.otherColumns.map((item, index) => (
                <TableCell
                  key={index + 2}
                  align="center"
                  sx={{ border: '1px solid #ccc' }}
                >
                  <Box
                    sx={{
                      minHeight: 80,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="body2" align="left">
                      {item.class}
                    </Typography>
                    <Typography variant="body2" align="left">
                      {item.subject}
                    </Typography>
                    <Typography variant="body2" align="left">
                      {item.room}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{ color: 'primary.dark' }}
                    >
                      {item.lecturer}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeTable;
