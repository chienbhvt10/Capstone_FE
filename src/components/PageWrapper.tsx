import Container from '@mui/material/Container';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Breakpoint } from '@mui/system';

interface Props {
  title?: string;
  children: [ReactNode, ReactNode] | ReactNode;
  maxWidth?: false | Breakpoint;
}

const PageWrapper = (props: Props) => {
  const { title = 'Capstone Project', children, maxWidth = false } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container
        maxWidth={maxWidth}
        sx={{
          height: 1,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          rowGap: 2,
          py: 2,
          px: 2,
        }}
      >
        {children}
      </Container>
    </Fragment>
  );
};

export default PageWrapper;
