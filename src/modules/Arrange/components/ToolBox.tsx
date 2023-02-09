import { Grid, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

type Props = {};

const ToolBox = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid container item xs={3.5}>
        <Stack direction="row" sx={{ width: 1, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ width: 80 }}>
            Group by
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
        <Stack direction="row" sx={{ width: 1, alignItems: 'center' }}>
          <Box component="span" sx={{ border: '7px solid #60D4B8' }}></Box>
          <Typography component="span" variant="body2">
            Final
          </Typography>
          <Box component="span" sx={{ border: '7px solid #FDC455' }}></Box>
          <Typography component="span" variant="body2">
            Public
          </Typography>
          <Box component="span" sx={{ border: '7px solid #FD5555' }}></Box>
          <Typography component="span" variant="body2">
            Reject
          </Typography>
          <Box component="span" sx={{ border: '7px solid #0083FC' }}></Box>
          <Typography component="span" variant="body2">
            Draft
          </Typography>
        </Stack>
      </Grid>
      <Grid container item xs={2.5}>
        <Stack direction="column" sx={{ display: 'block' }}>
          <Button fullWidth>View all expected</Button>
          <Button fullWidth>Import Timetable</Button>
        </Stack>
      </Grid>
      <Grid container item xs={3} sx={{ display: 'block' }}>
        <Stack direction="column">
          <Button fullWidth>Export in import format</Button>
          <Button fullWidth>Import Classes</Button>
        </Stack>
      </Grid>
      <Grid container item xs={3} sx={{ display: 'block' }}>
        <Stack direction="column">
          <Button fullWidth>Export group by lecturer</Button>
          <Button fullWidth>Arrange</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ToolBox;
