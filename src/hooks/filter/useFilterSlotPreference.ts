import { useState } from 'react';
import { PreferenceFilter } from '~/utils/types';

const useFilterSlotPreference = () => {
  const [filters, setFilters] = useState<PreferenceFilter>({
    pageNumber: 1,
    pageSize: 10,
  });

  const onChangePage = (pageNumber: number) => {
    setFilters((state) => ({
      ...state,
      pageNumber,
    }));
  };

  const onChangeRowsPerPage = (pageSize: number) => {
    setFilters((state) => ({
      ...state,
      pageNumber: 1,
      pageSize,
    }));
  };

  return { filters, onChangePage, onChangeRowsPerPage };
};

export default useFilterSlotPreference;
