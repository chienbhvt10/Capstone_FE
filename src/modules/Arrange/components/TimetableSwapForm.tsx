import { MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {}

const TimetableSwapForm = (props: Props) => {
  const onSwapLecturer = () => {};

  const onSwapRoom = () => {};

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="body1" align="center">
        Timetable Modify
      </Typography>
      <Divider variant="fullWidth" />

      <Stack
        direction="row"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="body2" sx={{ width: 80 }}>
          Lecturer Swap
        </Typography>
        <Select>
          <MenuItem disabled value="">
            <em>Select Lecturer</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Stack>
      <Button fullWidth onClick={onSwapLecturer}>
        Swap lecturer
      </Button>

      <Stack
        direction="row"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="body2" sx={{ width: 80 }}>
          Room Swap
        </Typography>
        <Select>
          <MenuItem disabled value="">
            <em>Select Room</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Stack>
      <Button fullWidth onClick={onSwapRoom}>
        Swap Room
      </Button>
    </Stack>
  );
};

export default TimetableSwapForm;
