import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import SubjectPreferenceLevel from './components/SubjectPreferenceLevel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import SlotPreferenceLevel from './components/SlotPreferenceLevel';

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
          height: 'calc(100vh - 120px)',
        }}
      >
        <Typography variant="h6">Preference Level</Typography>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Subject Preference Level" value="1" />
              <Tab label="Slot Preference Level" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
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
