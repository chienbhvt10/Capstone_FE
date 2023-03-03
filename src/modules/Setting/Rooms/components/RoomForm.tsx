import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutocompleteCustom from '~/components/FormComponents/AutocompleteCustom';

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

const RoomForm = () => {
  const onShowCreateDistanceDialog = () => {};

  const onShowCreateBuildingDialog = () => {};

  return (
    <Box sx={{ marginLeft: 0, maxWidth: 1300 }}>
      <Grid container spacing={2}>
        <Grid item container xs={3}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center', width: 1 }}
          >
            <Typography variant="body2" sx={{ width: 100 }}>
              Building 1
            </Typography>
            <AutocompleteCustom
              options={options}
              label="Select Building"
              renderOptionAllowRemove
            />
          </Stack>
        </Grid>
        <Grid item container xs={3}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center', width: 1 }}
          >
            <Typography variant="body2" sx={{ width: 100 }}>
              Building 2
            </Typography>
            <AutocompleteCustom
              options={options}
              label="Select Building"
              renderOptionAllowRemove
            />
          </Stack>
        </Grid>
        <Grid item container xs={3}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="body2" sx={{ width: 100 }}>
              Distance
            </Typography>
            <TextField variant="outlined" label="Distance" />
          </Stack>
        </Grid>
        <Grid item container xs={3}>
          <Stack direction="row">
            <Button onClick={onShowCreateDistanceDialog} sx={{ width: 120 }}>
              Create Distance
            </Button>
            <Button
              startIcon={<AddIcon />}
              onClick={onShowCreateBuildingDialog}
            >
              Building
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomForm;
