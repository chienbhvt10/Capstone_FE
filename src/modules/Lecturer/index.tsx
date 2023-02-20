import { Stack } from '@mui/material';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import RegisterScheduleForm from './components/RegisterScheduleForm';

const RegisterPage = () => {
  const [tab, setTab] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <PageWrapper title="Register Page">
      {/* <PageBreadcrumbs title={'Register'} breadcrumbs={[]} /> */}
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          overflowX: 'auto',
          height: 'calc(100vh - 60px)',
        }}
      >
        <RegisterScheduleForm title="Register Subject-Slot" />
      </Stack>
    </PageWrapper>
  );
};

export default RegisterPage;
