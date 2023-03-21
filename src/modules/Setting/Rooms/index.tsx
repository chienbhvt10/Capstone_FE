import AddIcon from '@mui/icons-material/Add';
import { TabContext, TabPanel } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PageWrapper from '~/components/PageWrapper';
import RoomTable from './components/DistanceTable';
import { useState } from 'react';
import BuildingForm from './components/BuildingForm';
import BuildingTable from './components/BuildingTable';

const DistanceSetting = () => {
  const [tab, setTab] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <PageWrapper title="Distance Setting">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          pb: 6,
          overflowX: 'hidden',
          height: 'calc(100vh - 60px)',
        }}
      >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="Building" value="1" />
              <Tab label="Distance" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <Stack
              direction="column"
              spacing={2}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 700,
                margin: '0 auto',
              }}
            >
              <BuildingForm />
              <BuildingTable />
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <RoomTable />
          </TabPanel>
        </TabContext>
      </Stack>
    </PageWrapper>
  );
};

export default DistanceSetting;
