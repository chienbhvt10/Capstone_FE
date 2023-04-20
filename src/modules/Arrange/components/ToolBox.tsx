import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import TextField from '@mui/material/TextField/TextField';
import { Stack } from '@mui/system';
import { SyntheticEvent, useEffect, useState } from 'react';
import useArrange from '~/hooks/useArrange';
import { Semester } from '~/modules/Semester/util/type';
import ExcelAndArrangeAction from './ExcelAndArrangeAction';
import FilterForm from './FilterForm';
import { getExecuteInfos } from '~/services/execute';
import useRefresh from '~/hooks/useRefresh';
import { ExecuteInfo } from '../utils/type';
import useAuth from '~/hooks/useAuth';

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
            getOptionLabel={(option) => `${option.semester} ${option.year}`}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            options={semesters}
            value={semestersSelector}
            onChange={onChangeSemestersSelector}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select Semester"
              />
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

      {/* <Stack direction="row" sx={{ width: 1, alignItems: 'center' }}>
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
        </Stack> */}
      <FilterForm />
    </Stack>
  );
};

export default ToolBox;
