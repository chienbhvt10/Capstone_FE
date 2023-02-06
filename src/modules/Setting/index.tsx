import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';

type Props = {};

const SettingPage = (props: Props) => {
  return (
    <PageWrapper title="Setting Page">
      <PageBreadcrumbs title={'Setting'} breadcrumbs={[]} />
      <Box></Box>
    </PageWrapper>
  );
};

export default SettingPage;
