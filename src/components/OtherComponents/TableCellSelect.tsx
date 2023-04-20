import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material';

import { useEffect, useState } from 'react';

interface Option {
  value: number;
  label: string;
}

interface Props<T extends Option> {
  item: any;
  value: number | string;
  selectItems: T[];
  selectTitle: string;
  callback?: (item: any, selectValue: any) => void;
}

const TableCellSelect = <T extends Option>(props: Props<T>) => {
  const { item, value, selectItems, selectTitle, callback } = props;
  const [selectValue, setSelectValue] = useState(value);

  const onChangeSelect = (
    event: SelectChangeEvent<any>,
    child: React.ReactNode
  ) => {
    setSelectValue(event.target.value);
    callback && callback(item, event.target.value);
  };

  return (
    <Select value={selectValue} onChange={onChangeSelect}>
      <MenuItem disabled value="">
        <em>{selectTitle}</em>
      </MenuItem>
      {selectItems.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TableCellSelect;
