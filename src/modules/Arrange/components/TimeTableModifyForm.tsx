import { MenuItem, Select } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import Form from '~/components/FormComponents/Form';
import Button from '@mui/material/Button';

interface Props {}

interface EditTimeTableFormValues {}

const TimeTableModifyForm = (props: Props) => {
  const form = useForm<EditTimeTableFormValues>({
    mode: 'onChange',
  });

  const onSubmitEditTimeTable = (data: EditTimeTableFormValues) => {};

  return (
    <Form form={form} onSubmit={onSubmitEditTimeTable}>
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
          <TextField variant="outlined" value="PRJ301" disabled />
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ width: 80 }}>
            Room
          </Typography>
          <TextField variant="outlined" value="AL-R306" disabled />
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ width: 80 }}>
            Lecturer
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
        <Button fullWidth>Edit</Button>
      </Stack>
    </Form>
  );
};

export default TimeTableModifyForm;
