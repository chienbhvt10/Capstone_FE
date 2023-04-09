import { Column, TimeSlot } from './type';

export const getTimeSlotTableColumns = () => {
  const columns: Column[] = [];

  columns.push(
    {
      id: 'Name',
      label: 'Name',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Description',
      label: 'Description',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Slot1',
      label: 'Slot1',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'Slot2',
      label: 'Slot2',
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

export const getTableSlotConflictColumns = (slots?: TimeSlot[]) => {
  const columns: Column[] = [];

  columns.push({
    id: 'TimeSlot',
    label: 'TimeSlot',
    minWidth: 60,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
  });

  const columnsDefined: Column[] =
    slots?.map((item) => ({
      id: item.id + '',
      label: item.name,
      minWidth: 25,
      align: 'center',
      minHeight: null,
      sticky: true,
      stickyPosition: null,
      format: null,
    })) ?? [];

  return [...columns, ...columnsDefined];
};

export const getTableSlotCompatibilityColumns = (slots?: TimeSlot[]) => {
  const columns: Column[] = [];

  columns.push({
    id: 'TimeSlot',
    label: 'TimeSlot',
    minWidth: 60,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
  });

  const columnsDefined: Column[] =
    slots?.map((item) => ({
      id: item.id + '',
      label: item.name,
      minWidth: 60,
      align: 'center',
      minHeight: null,
      sticky: true,
      stickyPosition: null,
      format: null,
    })) ?? [];

  return [...columns, ...columnsDefined];
};

export const getTableAreaSlotWeightColumns = (slots?: TimeSlot[]) => {
  const columns: Column[] = [];

  columns.push({
    id: 'TimeSlot',
    label: 'TimeSlot',
    minWidth: 60,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
  });

  const columnsDefined: Column[] =
    slots?.map((item) => ({
      id: item.id + '',
      label: item.name,
      minWidth: 30,
      align: 'center',
      minHeight: null,
      sticky: true,
      stickyPosition: null,
      format: null,
    })) ?? [];

  return [...columns, ...columnsDefined];
};

export const slotColumns: readonly Column[] = [
  { id: 'Slot', label: 'Slot', minWidth: 80, minHeight: 30, align: 'center' },
  { id: 'MON', label: 'MON', minWidth: 80, minHeight: 30, align: 'center' },
  {
    id: 'TUE',
    label: 'TUE',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
  },
  {
    id: 'WED',
    label: 'WED',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
  },
  {
    id: 'THU',
    label: 'THU',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
  },
  {
    id: 'FRI',
    label: 'FRI',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
  },
  {
    id: 'SAT',
    label: 'SAT',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
  },
  {
    id: 'SUN',
    label: 'SUN',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
  },
];

export const timeSlotColumns: readonly Column[] = [
  {
    id: 'TimeSlot',
    label: 'TimeSlot',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'Day Session',
    label: 'Day Session',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'MON',
    label: 'MON',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'TUE',
    label: 'TUE',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'WED',
    label: 'WED',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'THU',
    label: 'THU',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'FRI',
    label: 'FRI',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'SAT',
    label: 'SAT',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'SUN',
    label: 'SUN',
    minWidth: 80,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
  {
    id: 'Action',
    label: 'Action',
    minWidth: 50,
    minHeight: 30,
    align: 'center',
    sticky: true,
  },
];
