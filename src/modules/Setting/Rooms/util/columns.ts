import { Building, Column } from './type';

export const getDistanceColumns = (building?: Building[]) => {
  const columns: Column[] = [];

  columns.push({
    id: 'Building',
    label: 'Building',
    minWidth: 100,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
  });

  const columnsDefined: Column[] =
    building?.map((item) => ({
      id: item.id + '',
      label: item.shortName,
      minWidth: 60,
      align: 'center',
      minHeight: null,
      sticky: true,
      stickyPosition: null,
      format: null,
    })) ?? [];

  return [...columns, ...columnsDefined];
};

export const getBuildingColumns = () => {
  const columns: Column[] = [];

  columns.push(
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
      id: 'Tool',
      label: '',
      minWidth: 50,
      align: 'center',
    }
  );

  return [...columns];
};
