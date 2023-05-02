import { Stack } from '@mui/material';
import PageWrapper from '~/components/PageWrapper';
import TimeTable from './components/TimeTable';
import TimeTableModifyForm from './components/TimeTableModifyForm';
import ToolBox from './components/ToolBox';
import { useEffect } from 'react';
import useArrange from '~/hooks/useArrange';

interface Props {}

const ArrangePage = (props: Props) => {
  const { setTaskSelect } = useArrange();
  useEffect(() => {
    return () => {
      setTaskSelect(null);
    };
  }, []);

  return (
    <PageWrapper title="Arrange Page">
      {/* <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
        }}
      >
        <Stack direction="row" spacing={2}>
          <TimeTableModifyForm />
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: 'calc(100% - 250px)' }}
          >
            <ToolBox />
            <TimeTable />
          </Stack>
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default ArrangePage;
