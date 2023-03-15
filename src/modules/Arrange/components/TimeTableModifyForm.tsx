import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import images from '~/assets/images';
import Image from '~/components/styledComponents/Image';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import { modifyTimetable } from '../../../services/arrange';

const TimeTableModifyForm = () => {
  const { taskSelect, setTaskSelect, lecturers, rooms, refetch } = useArrange();
  const setNotification = useNotification();

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

  const onModifyTimeTable = async () => {
    try {
      const res = await modifyTimetable({
        lecturerId: taskSelect?.lecturerId || null,
        taskId: taskSelect?.taskId || null,
        roomId: taskSelect?.roomId || null,
      });

      if (res.isSuccess) {
        setNotification({
          message: 'Modify timetable success',
          severity: 'success',
        });
        refetch();
        return;
      }
      setNotification({ message: 'Modify timetable error', severity: 'error' });
    } catch (error) {
      setNotification({ message: 'Modify timetable error', severity: 'error' });
    }
  };

  const exportInImportFormat = () => {
    const url = 'https://localhost:7279/Timetable-20230306171426222.xlsx';
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Timetable-20230306171426222.xlsx');
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="column" spacing={1}>
        <Typography variant="body1" align="center">
          Action
        </Typography>
        <Divider variant="fullWidth" />
        <Button
          startIcon={
            <Image
              src={images.iconArrange}
              sx={{ width: 25, height: 25 }}
              alt=""
            />
          }
          fullWidth
        >
          Arrange
        </Button>
        <Button
          startIcon={
            <Image
              src={images.iconImport}
              sx={{ width: 18, height: 18 }}
              alt=""
            />
          }
          fullWidth
        >
          Import Timetable
        </Button>
        <Button
          onClick={exportInImportFormat}
          startIcon={
            <Image
              src={images.iconExport}
              sx={{ width: 18, height: 18 }}
              alt=""
            />
          }
          fullWidth
        >
          Export in import format
        </Button>
        <Button
          startIcon={
            <Image
              src={images.iconExport}
              sx={{ width: 18, height: 18 }}
              alt=""
            />
          }
          fullWidth
        >
          Export group by lecturer
        </Button>
      </Stack>
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
            Subject
          </Typography>
          <TextField
            variant="outlined"
            value={taskSelect?.subjectName || ''}
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ width: 80 }}>
            Room
          </Typography>
          <TextField
            variant="outlined"
            value={taskSelect?.roomName || ''}
            disabled
          />
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ width: 80 }}>
            TimeSlot
          </Typography>
          <TextField
            variant="outlined"
            value={taskSelect?.timeSlotName || ''}
            disabled
          />
        </Stack>
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
            {lecturers &&
              lecturers.length &&
              lecturers?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.shortName}
                </MenuItem>
              ))}
          </Select>
        </Stack>
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
            {rooms &&
              rooms.length &&
              rooms?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </Stack>
        <Button fullWidth onClick={onModifyTimeTable}>
          Edit
        </Button>
      </Stack>
    </Stack>
  );
};

export default TimeTableModifyForm;
