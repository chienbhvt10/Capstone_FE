import { Column } from './type';

export const getRoomsDistanceColumns = () => {
  const columns: Column[] = [];

  columns.push(
    {
      id: 'Building1',
      label: 'Building 1',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Building2',
      label: 'Building 2',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Distance',
      label: 'Distance',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Tool',
      label: '',
      minWidth: 50,
      align: 'center',
    }
  );

  return [...columns];
};
