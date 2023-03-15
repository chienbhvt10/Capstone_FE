import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField } from '@mui/material';

const SubjectForm = () => {
  const onCreateSubject = () => {};

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
      <TextField variant="outlined" label="Subject Code" sx={{ width: 200 }} />

      <TextField variant="outlined" label="Subject Name" sx={{ width: 200 }} />

      <TextField variant="outlined" label="Department" sx={{ width: 200 }} />

      <TextField variant="outlined" label="OrderNumber" sx={{ width: 200 }} />

      <Stack direction="row">
        <Button
          startIcon={<AddIcon />}
          onClick={onCreateSubject}
          size="medium"
          sx={{ width: 160 }}
        >
          Create Subject
        </Button>
      </Stack>
    </Stack>
  );
};

export default SubjectForm;
