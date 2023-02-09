import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { timeTableColumns } from '../utils/column';
import { timeTableRows } from '../utils/row';

interface Props {}

const TimeTable = (props: Props) => {
  return (
    <TableContainer sx={{ maxHeight: 550 }}>
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
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
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
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A24?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A24?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A24?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A42?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A42?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A42?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P24?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P24?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P24?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P42?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P42?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P42?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A25?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A25?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A25?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A52?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A52?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A52?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P25?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P25?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P25?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P52?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P52?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P52?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A35?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A35?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A35?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A53?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A53?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A53?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P35?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P35?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P35?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P53?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P53?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P53?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A36?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A36?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A36?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A63?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A63?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A63?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P36?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P36?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P36?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P63?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P63?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P63?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A46?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A46?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A46?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A64?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A64?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A64?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P46?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P46?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P46?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P64?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P64?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P64?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.A77?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.A77?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.A77?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
                <Box
                  sx={{
                    minHeight: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body2" align="left">
                    {item.P77?.class}
                  </Typography>
                  <Typography variant="body2" align="left">
                    {item.P77?.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'primary.dark' }}
                  >
                    {item.P77?.room}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #ccc' }}>
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
