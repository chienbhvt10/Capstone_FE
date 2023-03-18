import { Column } from './type';

export const getSubjectTableColumns = () => {
  const columns: Column[] = [];

  columns.push(
    {
      id: 'SubjectCode',
      label: 'Subject Code',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'SubjectName',
      label: 'Subject Name',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Department',
      label: 'Department',
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
