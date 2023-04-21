import { TabContext, TabPanel } from '@mui/lab';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { SyntheticEvent, useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import BuildingForm from './components/BuildingForm';
import BuildingTable from './components/BuildingTable';
import DistanceTable from './components/DistanceTable';
import { Building, BuildingDistanceData } from './util/type';
import {
  getAllBuilding,
  getDistances,
  reuseBuilding,
} from '~/services/distance';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import useAuth from '~/hooks/useAuth';
import useArrange from '~/hooks/useArrange';
import useNotification from '~/hooks/useNotification';

const DistanceSetting = () => {
  const [tab, setTab] = useState('1');
  const setNotifications = useNotification();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Building | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [distances, setDistances] = useState<BuildingDistanceData[]>([]);
  const [refresh, refetch] = useRefresh();
  const { user } = useAuth();
  const { currentSemester } = useArrange();
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );

  useEffect(() => {
    if (currentSemester) {
      setSemestersSelector(currentSemester);
    }
  }, [currentSemester]);

  useEffect(() => {
    if (semestersSelector && user) {
      getAllBuilding({
        semesterId: semestersSelector?.id || null,
        departmentHeadId: user?.id || null,
      }).then((res) => {
        setBuildings(res.data || []);
      });
      getDistances({
        semesterId: semestersSelector?.id || null,
        departmentHeadId: user?.id || null,
      }).then((res) => {
        setDistances(res.data || []);
      });
    }
  }, [refresh, semestersSelector, user]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const onChangeSemestersSelector = (
    event: SyntheticEvent,
    newValue: Semester | null
  ) => {
    setSemestersSelector(newValue);
    refetch();
  };

  const reUseForCurrentSemester = () => {
    reuseBuilding({
      fromSemesterId: semestersSelector?.id || 0,
      toSemesterId: currentSemester?.id || 0,
      departmentHeadId: user?.id || 0,
    }).then((res) => {
      if (!res.isSuccess) {
        setNotifications({ message: res.message, severity: 'error' });
        return;
      }
      setNotifications({ message: res.message, severity: 'success' });
    });
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
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'flex-start' }}
            >
              <BuildingForm
                refetch={refetch}
                editMode={editMode}
                editingItem={editingItem}
                setEditMode={setEditMode}
              />
              <BuildingTable
                buildings={buildings}
                semestersSelector={semestersSelector}
                onChangeSemestersSelector={onChangeSemestersSelector}
                reUseForCurrentSemester={reUseForCurrentSemester}
                refetch={refetch}
                setEditMode={setEditMode}
                setEditingItem={setEditingItem}
              />
            </Stack>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, m: 0 }}>
            <DistanceTable
              buildings={buildings}
              distances={distances}
              refetch={refetch}
            />
          </TabPanel>
        </TabContext>
      </Stack>
    </PageWrapper>
  );
};

export default DistanceSetting;
