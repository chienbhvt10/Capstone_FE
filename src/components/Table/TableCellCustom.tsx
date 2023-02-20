import TableCell, { TableCellProps } from '@mui/material/TableCell';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface Props extends TableCellProps {
  children: React.ReactNode;
  align?: 'center' | 'left' | 'right';
  stickyPosition?: ('left' | 'right') | null;
  sticky?: boolean | null;
  minWidth?: number | null;
  minHeight?: number | null;
  BoxProps?: BoxProps;
  border?: boolean | null;
  hover?: boolean | null;
  backgroundEmphasize?: boolean | null;
}

const TableCellCustom = (props: Props) => {
  const {
    children,
    align,
    stickyPosition,
    sticky,
    minHeight,
    minWidth,
    BoxProps,
    border,
    hover,
    backgroundEmphasize,
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <TableCell
      align={align}
      sx={{
        background: backgroundEmphasize ? '#5aafff' : '#FFF',
        border: border ? '1px solid #ccc' : '0px solid #ccc',
        left: stickyPosition === 'left' ? 0 : 'unset',
        right: stickyPosition === 'right' ? 0 : 'unset',
        position: sticky ? 'sticky' : 'unset',
        zIndex: sticky ? theme.zIndex.appBar + 10 : theme.zIndex.appBar,
        '&:hover': hover
          ? {
              backgroundColor: '#DDF5FF',
              cursor: 'pointer',
            }
          : {},
        ...rest.sx,
      }}
      {...rest}
    >
      <Box
        {...BoxProps}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: minWidth,
          minHeight: minHeight,
        }}
      >
        {children}
      </Box>
    </TableCell>
  );
};

export default TableCellCustom;
