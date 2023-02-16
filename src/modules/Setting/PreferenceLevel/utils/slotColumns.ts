import { Column } from './types';

export const getTableSlotColumns = (slots?: any) => {
  const columns: Column[] = [];

  columns.push({
    id: 'Lecturer',
    label: 'Lecturer',
    minWidth: 100,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
  });

  const subjectsClone = [
    {
      id: 'A24',
      label: 'A24',
    },
    {
      id: 'A42',
      label: 'A42',
    },
    {
      id: 'P24',
      label: 'P24',
    },
    {
      id: 'P42',
      label: 'P42',
    },
    {
      id: 'A25',
      label: 'A25',
      align: 'center',
    },
    {
      id: 'A52',
      label: 'A52',
    },
    {
      id: 'P25',
      label: 'P25',
    },
    {
      id: 'P52',
      label: 'P52',
    },
    {
      id: 'A35',
      label: 'A35',
    },
    {
      id: 'A53',
      label: 'A53',
    },
    {
      id: 'P35',
      label: 'P35',
    },
    {
      id: 'P53',
      label: 'P53',
    },
    {
      id: 'A36',
      label: 'A36',
    },
    {
      id: 'A63',
      label: 'A63',
    },
    {
      id: 'P36',
      label: 'P36',
    },
    {
      id: 'P63',
      label: 'P63',
    },
    {
      id: 'A46',
      label: 'A46',
    },
    {
      id: 'A64',
      label: 'A64',
    },
    {
      id: 'P46',
      label: 'P46',
    },
    {
      id: 'P64',
      label: 'P64',
    },
    {
      id: 'A77',
      label: 'A77',
    },
    {
      id: 'P77',
      label: 'P77',
    },
  ];

  const columnsDefined: Column[] = subjectsClone.map((item) => ({
    ...item,
    minWidth: 60,
    align: 'center',
    minHeight: null,
    sticky: null,
    stickyPosition: null,
    format: null,
  }));

  return [...columns, ...columnsDefined];
};
