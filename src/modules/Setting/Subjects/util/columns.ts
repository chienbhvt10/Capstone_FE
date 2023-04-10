import { Column } from './type';

export const getSubjectTableColumns = () => {
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
      id: 'SubjectCode',
      label: 'Subject Code',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'SubjectName',
      label: 'Subject Name',
      minWidth: 100,
      align: 'center',
      sticky: true,
    },
    {
      id: 'Department',
      label: 'Department',
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
