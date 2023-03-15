import { Column } from './type';

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
      id: 'OrderNumber',
      label: 'OrderNumber',
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

export const getTableSlotConflictColumns = (slots?: any) => {
  const columns: Column[] = [];

  columns.push({
    id: 'Lecturer',
    label: 'Lecturer',
    minWidth: 100,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
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

export const getTableSlotCompatibilityColumns = (slots?: any) => {
  const columns: Column[] = [];

  columns.push({
    id: 'Lecturer',
    label: 'Lecturer',
    minWidth: 100,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
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
    sticky: true,
    stickyPosition: null,
    format: null,
  }));

  return [...columns, ...columnsDefined];
};

export const getTableAreaSlotWeightColumns = (slots?: any) => {
  const columns: Column[] = [];

  columns.push({
    id: 'Lecturer',
    label: 'Lecturer',
    minWidth: 100,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
    zIndex: 1111,
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

export const slotColumns: readonly Column[] = [
  { id: '', label: '', minWidth: 80, minHeight: 30, align: 'center' },
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
  },
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
  {
    id: 'tool',
    label: '',
    minWidth: 50,
    minHeight: 30,
    align: 'center',
  },
];
