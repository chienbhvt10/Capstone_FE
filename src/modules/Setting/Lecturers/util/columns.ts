import { Column } from './type';

export const getLecturersTableColumns = () => {
  const columns: Column[] = [];

  columns.push(
    {
      id: 'Email',
      label: 'Email',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Name',
      label: 'Name',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Short Name',
      label: 'Short Name',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Quota',
      label: 'Quota',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Min Quota',
      label: 'Min Quota',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Action',
      label: 'Action',
      minWidth: 50,
      align: 'center',
      sticky: true,
    }
  );

  return [...columns];
};
