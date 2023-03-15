import { TimeSlot } from '~/modules/Setting/TimeSlots/utils/type';
import { Column } from './type';

export const getTableTimeSlotColumns = (slots?: TimeSlot[]): Column[] => {
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

  return [
    ...columns,
    ...columnsDefined,
    {
      id: 'Total',
      label: 'Total',
      minWidth: 50,
      align: 'center',
      sticky: true,
      stickyPosition: 'right',
    },
  ];
};
