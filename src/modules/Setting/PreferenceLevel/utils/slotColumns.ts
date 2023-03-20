import { TimeSlot } from '../../TimeSlots/utils/type';
import { Column } from './types';

export const getTableSlotColumns = (slots?: TimeSlot[]) => {
  const columns: Column[] = [];

  columns.push({
    id: 'Lecturer',
    label: 'Lecturer',
    minWidth: 100,
    align: 'center',
    sticky: true,
    stickyPosition: 'left',
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
