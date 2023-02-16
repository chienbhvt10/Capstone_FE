import { Column } from './types';

export const getTableSubjectColumns = (subjects?: any) => {
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
      id: 'PRJ301',
      label: 'PRJ301',
    },
    {
      id: 'DBI202',
      label: 'DBI202',
    },
    {
      id: 'OSG202',
      label: 'OSG202',
    },
    {
      id: 'PRJ321',
      label: 'PRJ321',
    },
    {
      id: 'PRN311',
      label: 'PRN311',
    },
    {
      id: 'PRF192',
      label: 'PRF192',
    },
    {
      id: 'PRN292',
      label: 'PRN292',
    },
    {
      id: 'PRN122',
      label: 'PRN122',
    },
    {
      id: 'SWE103',
      label: 'SWE103',
    },
    {
      id: 'SWE113',
      label: 'SWE113',
    },
    {
      id: 'SWD103',
      label: 'SWD103',
    },
    {
      id: 'SWR103',
      label: 'SWR103',
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
