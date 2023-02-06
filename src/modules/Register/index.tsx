import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';
type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <PageWrapper title="Register Page">
      <PageBreadcrumbs title={'Register'} breadcrumbs={[]} />
      <Box></Box>
    </PageWrapper>
  );
};

export default RegisterPage;
