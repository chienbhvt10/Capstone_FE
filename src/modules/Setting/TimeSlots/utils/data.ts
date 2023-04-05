import {
  AreaSlotWeightSelectItem,
  DaySessionSelectItem,
  SlotConflictSelectItem,
  SlotSelectItem,
} from './type';

export const slotConflictItem: SlotConflictSelectItem[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

export const areaSlotWeightItem: AreaSlotWeightSelectItem[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

export const daySessionItem: DaySessionSelectItem[] = [
  { value: 0, label: 'PM' },
  { value: 1, label: 'AM' },
];

export const getSlotSelectItem = (numberOfSlot: number): SlotSelectItem[] => {
  let slotSelectItem: SlotSelectItem[] = [];
  for (let i = 1; i <= numberOfSlot; i++) {
    slotSelectItem = [...slotSelectItem, { value: i, label: `Slot ${i}` }];
  }

  return slotSelectItem;
};
