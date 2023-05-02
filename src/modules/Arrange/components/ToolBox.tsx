import {
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { SyntheticEvent, useEffect, useState } from 'react';
import useArrange from '~/hooks/useArrange';
import useAuth from '~/hooks/useAuth';
import { Semester } from '~/modules/Semester/util/type';
import { getExecuteInfos } from '~/services/execute';
import { ExecuteInfo } from '../utils/type';
import ExcelAndArrangeAction from './ExcelAndArrangeAction';
import FilterForm from './FilterForm';

import { Backdrop } from '@mui/material';

const ToolBox = () => {
  const {
    executeId,
    setExecuteId,
    setTaskSelect,
    semestersSelector,
    setSemestersSelector,
    semesters,
    refreshListExecuteInfo,
    refetchListExecuteInfo,
    loadingExecuteData,
    setLoadingExecuteData,
  } = useArrange();
  const { user } = useAuth();
  const [executeInfos, setExecuteInfos] = useState<ExecuteInfo[]>([]);

  useEffect(() => {
    if (semestersSelector && user) {
      getExecuteInfos({
        semesterId: semestersSelector?.id || null,
        departmentHeadId: user?.id || null,
      }).then((res) => {
        setExecuteInfos(res.data || []);
      });
    }
  }, [semestersSelector, user, refreshListExecuteInfo]);

  const onChangeExecuteId = async (event: SelectChangeEvent<number>) => {
    setLoadingExecuteData(true);
    setExecuteId(event.target.value as number);
    setTaskSelect(null);
  };

  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Semester | null
  ) => {
    setSemestersSelector(newValue);
    refetchListExecuteInfo();
  };

  return (
    <Stack direction="row" spacing={1}>
      <ExcelAndArrangeAction />
      <Stack
        direction="column"
        spacing={1}
        sx={{ border: '1px solid #ccc', p: 1, borderRadius: 1, maxWidth: 200 }}
      >
        <Stack direction="column" sx={{ width: 1 }}>
          <Autocomplete
            sx={{ width: 1 }}
            size="small"
            filterSelectedOptions
            disabled
            getOptionLabel={(option) => `${option.semester} ${option.year}`}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={semesters}
            value={semestersSelector}
            onChange={onChangeSemestersSelector}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Stack>
        <Stack direction="column" sx={{ width: 1, alignItems: 'center' }}>
          <Select value={executeId} onChange={onChangeExecuteId}>
            <MenuItem disabled value={0}>
              <em style={{ fontSize: 14 }}>Select Execute Time</em>
            </MenuItem>
            {executeInfos?.length > 0 &&
              executeInfos?.map((item) => (
                <MenuItem value={item.executeId}>
                  {item.executeTime
                    ? new Date(item.executeTime).toLocaleString('vi-VI')
                    : 'Unknown'}
                </MenuItem>
              ))}
          </Select>
        </Stack>
      </Stack>

      <Backdrop
        sx={{
          color: '#fff',
          mt: '0 !important',
          zIndex: 9999,
        }}
        open={loadingExecuteData}
      >
        <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress sx={{ color: 'white' }} />
          <Typography variant="body1">Loading arrange result ...</Typography>
        </Stack>
      </Backdrop>
      <FilterForm />
    </Stack>
  );
};

export default ToolBox;
