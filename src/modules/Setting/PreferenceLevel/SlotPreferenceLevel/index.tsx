import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import { SelectChangeEvent } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { lecturerSlotPreferenceLevel } from '../utils/data';
import { getTableSlotColumns } from '../utils/slotColumns';
import { useState } from 'react';
import { useMemo } from 'react';

const SlotPreferenceLevel = () => {
  const theme = useTheme();
  const [currentSelectValue, setCurrentSelectValue] = useState<string>('');

  const columns = useMemo(() => getTableSlotColumns(), []);

  const onChangeSelect = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setCurrentSelectValue(event.target.value);
  };

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
          borderSpacing: 1,
        }}
      >
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
          {lecturerSlotPreferenceLevel.map((item, index) => (
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
                  <Typography variant="body1">{item.lecturer}</Typography>
                </Box>
              </TableCell>
              {item.slots.map((slot, index) => (
                <TableCell
                  key={index + 2}
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
                    sx={{
                      minHeight: 60,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Select
                      value={
                        currentSelectValue
                          ? currentSelectValue
                          : slot.preferenceLevel.toString()
                      }
                      onChange={onChangeSelect}
                    >
                      <MenuItem disabled value="">
                        <em>Select preference level</em>
                      </MenuItem>
                      <MenuItem value="1">0</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                    </Select>
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

export default SlotPreferenceLevel;