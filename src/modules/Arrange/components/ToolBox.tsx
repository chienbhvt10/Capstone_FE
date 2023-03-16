import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import useArrange from '~/hooks/useArrange';
import FilterForm from './FilterForm';

const ToolBox = () => {
  const { executeId, setExecuteId, executeInfos } = useArrange();

  const onGetScheduleByExecuteId = async (executeId: number) => {
    setExecuteId(executeId);
  };

  const onChangeExecuteId = (event: SelectChangeEvent<number>) => {
    setExecuteId(event.target.value as number);
    onGetScheduleByExecuteId(Number(event.target.value));
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={6} lg={3.5}>
        <Stack
          direction="row"
          sx={{ width: 1, alignItems: 'center', maxWidth: 300 }}
        >
          <Typography variant="body2" sx={{ width: 200 }}>
            Execute Time
          </Typography>
          <Select value={executeId} onChange={onChangeExecuteId}>
            <MenuItem disabled value={0}>
              <em style={{ fontSize: 14 }}>Select Execute Time</em>
            </MenuItem>
            {executeInfos?.length &&
              executeInfos?.length > 0 &&
              executeInfos?.map((item) => (
                <MenuItem value={item.id}>
                  {item.executeTime
                    ? new Date(item.executeTime).toLocaleString('vi-VI')
                    : 'Unknown'}
                </MenuItem>
              ))}
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
      <Grid container item xs={6} lg={8.5}>
        <FilterForm />
      </Grid>
    </Grid>
  );
};

export default ToolBox;
