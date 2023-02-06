import { Box } from '@mui/material';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PageWrapper from '../../components/PageWrapper';

type Props = {};

const ArrangePage = (props: Props) => {
  return (
    <PageWrapper title="Arrange Page">
      <PageBreadcrumbs title={'Arrange'} breadcrumbs={[]} />
      <Box></Box>
    </PageWrapper>
  );
};

export default ArrangePage;
