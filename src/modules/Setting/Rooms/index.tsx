import { TabContext, TabPanel } from '@mui/lab';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import BuildingForm from './components/BuildingForm';
import BuildingTable from './components/BuildingTable';
import RoomTable from './components/DistanceTable';
import { Building } from './util/type';

const DistanceSetting = () => {
  const [tab, setTab] = useState('1');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Building | null>(null);

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
          <TabPanel value="1" sx={{ p: 0, m: 0 }}>
            <Stack direction="row" spacing={2}>
              <BuildingForm
                editMode={editMode}
                editingItem={editingItem}
                setEditMode={setEditMode}
              />
              <BuildingTable
                setEditMode={setEditMode}
                setEditingItem={setEditingItem}
              />
            </Stack>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, m: 0 }}>
            <RoomTable />
          </TabPanel>
        </TabContext>
      </Stack>
    </PageWrapper>
  );
};

export default DistanceSetting;
