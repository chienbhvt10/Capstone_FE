import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

interface Option {
  id: number;
  title: string;
}

const options: Option[] = [
  {
    id: 1,
    title: 'value1',
  },
  {
    id: 2,
    title: 'value2',
  },
  {
    id: 3,
    title: 'value3',
  },
  {
    id: 4,
    title: 'value4',
  },
];

const SubjectForm = () => {
  const onShowCreateDistanceDialog = () => {};

  const onShowCreateBuildingDialog = () => {};

  return (
    <Box
      sx={{
        maxWidth: 1200,
        px: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item container xs={3.5}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center', width: 1 }}
          >
            <Typography variant="body2" sx={{ width: 120 }}>
              SubjectCode
            </Typography>
            <TextField variant="outlined" label="Subject Code" />
          </Stack>
        </Grid>
        <Grid item container xs={3.5}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center', width: 1 }}
          >
            <Typography variant="body2" sx={{ width: 130 }}>
              SubjectName
            </Typography>
            <TextField variant="outlined" label="Subject Name" />
          </Stack>
        </Grid>
        <Grid item container xs={3.5}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="body2" sx={{ width: 100 }}>
              Department
            </Typography>
            <TextField variant="outlined" label="Department" />
          </Stack>
        </Grid>
        <Grid item container xs={1.5}>
          <Stack direction="row">
            <Button
              startIcon={<AddIcon />}
              onClick={onShowCreateDistanceDialog}
              sx={{ width: 130 }}
            >
              Create Class
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubjectForm;
