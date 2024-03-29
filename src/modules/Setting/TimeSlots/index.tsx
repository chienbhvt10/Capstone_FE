import { TabContext, TabPanel } from '@mui/lab';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import AreaSlotWeight from './AreaSlotWeight';
import TimeSlotSetting from './TimeSlotSetting';
import TimeSlotConflict from './TimeslotConflict';

const TimeSlotsSettingPage = () => {
  const [tab, setTab] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <PageWrapper title="TimeSlot Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
          height: 'calc(100vh - 120px)',
        }}
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="TimeSlot Setting" value="1" />
              <Tab label="TimeSlot Conflict" value="2" />
              <Tab label="Area Slot Weight" value="4" />
            </Tabs>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <TimeSlotSetting />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <TimeSlotConflict />
          </TabPanel>

          <TabPanel value="4" sx={{ p: 0 }}>
            <AreaSlotWeight />
            <Stack
              direction="row"
              sx={{
                maxWidth: 450,
                justifyContent: 'flex-end',
                fontSize: '13px',
                marginLeft: 'auto',
              }}
            >
              <ul>
                Note:
                <li>O-04</li>
                <li>
                  Giải thích area slot weight là tham số di chuyển giữa 2 slot,
                  tham số càng lớn thì càng thì càng ưu tiên xếp lớp tối ưu
                  khoảng cách giữa 2 timeslot đấy
                </li>
              </ul>
            </Stack>
          </TabPanel>
        </TabContext>
      </Stack>
    </PageWrapper>
  );
};

export default TimeSlotsSettingPage;
