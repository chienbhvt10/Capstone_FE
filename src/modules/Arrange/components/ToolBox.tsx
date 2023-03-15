import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import Image from '~/components/styledComponents/Image';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';
import { getExecutedArrangeInfo, getTaskNotAssign } from '../services';

const ToolBox = () => {
  const {
    setLecturersTaskAssignInfo,
    setTasksNotAssigned,
    executeId,
    setExecuteId,
  } = useArrange();
  const setNotification = useNotification();

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
            Select Execute Time
          </Typography>
          <Select value={executeId} onChange={onChangeExecuteId}>
            <MenuItem disabled value={0}>
              <em>Select Execute Time</em>
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
      <Grid container item xs={6} lg={2.5} sx={{ display: 'block' }}>
        <Stack direction="column" sx={{ alignItems: 'center' }}>
          <Button fullWidth sx={{ maxWidth: 200 }}>
            View all expected
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
            sx={{ maxWidth: 200 }}
          >
            Import Timetable
          </Button>
        </Stack>
      </Grid>
      <Grid container item xs={6} lg={3} sx={{ display: 'block' }}>
        <Stack direction="column" sx={{ alignItems: 'center' }}>
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
            sx={{ maxWidth: 200 }}
          >
            Export in import format
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
            sx={{ maxWidth: 200 }}
          >
            Import Classes
          </Button>
        </Stack>
      </Grid>
      <Grid container item xs={6} lg={3} sx={{ display: 'block' }}>
        <Stack direction="column" sx={{ alignItems: 'center' }}>
          <Button
            startIcon={
              <Image
                src={images.iconExport}
                sx={{ width: 18, height: 18 }}
                alt=""
              />
            }
            fullWidth
            sx={{ maxWidth: 200 }}
          >
            Export group by lecturer
          </Button>
          <Button
            startIcon={
              <Image
                src={images.iconArrange}
                sx={{ width: 25, height: 25 }}
                alt=""
              />
            }
            fullWidth
            sx={{ maxWidth: 200 }}
          >
            Arrange
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ToolBox;
