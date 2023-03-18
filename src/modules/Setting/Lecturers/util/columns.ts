import { Column } from './type';

export const getLecturersTableColumns = () => {
  const columns: Column[] = [];

  columns.push(
    {
      id: 'Email',
      label: 'Email',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Name',
      label: 'Name',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Short Name',
      label: 'Short Name',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Action',
      label: 'Action',
      minWidth: 50,
      align: 'center',
    }
  );

  return [...columns];
};
