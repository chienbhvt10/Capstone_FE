import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField } from '@mui/material';

const LecturerForm = () => {
  const onCreateLecturer = () => {};

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        maxWidth: 1200,
        px: 4,
        alignItems: 'flex-end',
      }}
    >
      <TextField
        variant="outlined"
        label="Lecturer Email"
        sx={{ width: 200 }}
      />

      <TextField variant="outlined" label="Lecturer Code" sx={{ width: 200 }} />

      <TextField variant="outlined" label="Lecturer Name" sx={{ width: 200 }} />

      <TextField variant="outlined" label="Department" sx={{ width: 200 }} />

      <Stack direction="row">
        <Button
          startIcon={<AddIcon />}
          onClick={onCreateLecturer}
          size="medium"
          sx={{ width: 160 }}
        >
          Create Lecturer
        </Button>
      </Stack>
    </Stack>
  );
};

export default LecturerForm;
