import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TimeTableModifyForm from './TimeTableModifyForm';
import TimetableSwapForm from './TimetableSwapForm';

interface Props {}

const TimetableModify = (props: Props) => {
  const onRequestLecturerConfirm = () => {};

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        border: '1px solid #ccc',
        p: 2,
        borderRadius: 1,
        width: 250,
      }}
    >
      <TimeTableModifyForm />
      {/* <Stack direction="column" spacing={1}>
        <Typography variant="body1" align="center">
          Request Confirm
        </Typography>
        <Divider variant="fullWidth" />
        <Button fullWidth onClick={onRequestLecturerConfirm}>
          Request Lecturer Confirm
        </Button>
      </Stack> */}
    </Stack>
  );
};

export default TimetableModify;
