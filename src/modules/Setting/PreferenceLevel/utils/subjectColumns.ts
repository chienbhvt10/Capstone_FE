import { Subject } from '../../Subjects/util/type';
import { Column } from './types';

export const getTableSubjectColumns = (subjects?: Subject[]) => {
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
    subjects?.map((item) => ({
      id: item.id + '',
      label: item.code,
      minWidth: 60,
      align: 'center',
      minHeight: null,
      sticky: true,
      stickyPosition: null,
      format: null,
    })) ?? [];

  return [...columns, ...columnsDefined];
};
