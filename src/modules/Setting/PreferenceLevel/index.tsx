import { TabContext, TabPanel } from '@mui/lab';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import SlotPreferenceLevel from './SlotPreferenceLevel';
import SubjectPreferenceLevel from './SubjectPreferenceLevel';

const PreferenceLevelSetting = () => {
  const [tab, setTab] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <PageWrapper title="Preference Level Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
          height: 'calc(100vh - 60px)',
        }}
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="Subject Preference Level" value="1" />
              <Tab label="Slot Preference Level" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1" sx={{ p: 0, m: 0 }}>
            <SubjectPreferenceLevel />
          </TabPanel>
          <TabPanel value="2">
            <SlotPreferenceLevel />
          </TabPanel>
        </TabContext>
      </Stack>
    </PageWrapper>
  );
};

export default PreferenceLevelSetting;
