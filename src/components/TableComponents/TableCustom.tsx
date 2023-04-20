import Table, { TableProps } from '@mui/material/Table';
import { tableCellClasses } from '@mui/material/TableCell';
import React from 'react';

interface Props extends TableProps {
  children: React.ReactNode;
}

const TableCustom = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Table
      stickyHeader
      sx={{
        [`& .${tableCellClasses.root}`]: {
          px: 1,
        },
        [`& th.${tableCellClasses.root}`]: {
          p: 2,
        },
        borderSpacing: 1,
      }}
      {...rest}
    >
      {children}
    </Table>
  );
};

export default TableCustom;
