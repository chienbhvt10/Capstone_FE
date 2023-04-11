import { Column } from './type';

export const getSemesterTableColumns = () => {
  const columns: Column[] = [];

  columns.push(
    {
      id: 'No',
      label: 'No',
      minWidth: 50,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Semester',
      label: 'Semester',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Year',
      label: 'Year',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Current Semester',
      label: 'Current Semester',
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
