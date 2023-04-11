import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useArrange from '~/hooks/useArrange';

interface Props {}

const SwapTimeTableForm = (props: Props) => {
  const {
    taskSelect,
    setTaskSelect,
    lecturers,
    rooms,
    loadingTimeTableModify,
    refetch,
  } = useArrange();

  const onChangeLecturerSelect = (event: SelectChangeEvent<number>) => {
    if (taskSelect) {
      setTaskSelect({
        ...taskSelect,
        lecturerId: (event.target.value as number) || 0,
      });
    }
  };
  const onChangeRoomSelect = (event: SelectChangeEvent<number>) => {
    if (taskSelect) {
      setTaskSelect({
        ...taskSelect,
        roomId: (event.target.value as number) || 0,
      });
    }
  };
  const onSwapLecturer = () => {};

  const onSwapRoom = () => {};

  return (
    <Stack direction="column" spacing={2} sx={{ position: 'relative' }}>
      <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>
        Swap Timetable
      </Typography>
      <Divider variant="fullWidth" />
      <Stack
        direction="row"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="body2" sx={{ width: 80 }}>
          Lecturer
        </Typography>
        <Select
          value={taskSelect?.lecturerId || 0}
          onChange={onChangeLecturerSelect}
        >
          <MenuItem disabled value={0}>
            <em style={{ fontSize: 14 }}>Select Lecturer</em>
          </MenuItem>
          {lecturers.length &&
            lecturers?.map((item) => (
              <MenuItem key={Math.random()} value={item.id}>
                {item.shortName}
              </MenuItem>
            ))}
        </Select>
      </Stack>

      <Button fullWidth onClick={onSwapLecturer} size="medium">
        Swap Lecturer
      </Button>
      <Stack
        direction="row"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="body2" sx={{ width: 80 }}>
          Room
        </Typography>
        <Select value={taskSelect?.roomId || 0} onChange={onChangeRoomSelect}>
          <MenuItem disabled value={0}>
            <em style={{ fontSize: 14 }}>Select Room</em>
          </MenuItem>
          {rooms.length &&
            rooms?.map((item) => (
              <MenuItem key={Math.random()} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </Stack>

      <Button fullWidth onClick={onSwapRoom} size="medium">
        Swap Room
      </Button>
    </Stack>
  );
};

export default SwapTimeTableForm;
