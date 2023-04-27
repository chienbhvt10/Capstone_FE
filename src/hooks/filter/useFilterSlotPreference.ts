import { useState } from 'react';
import { PreferenceFilter } from '~/utils/types';

const useFilterSlotPreference = () => {
  const [filters, setFilters] = useState<PreferenceFilter>({
    pageNumber: 1,
    pageSize: 5,
    lecturer: null,
  });
  const onSearch = (searchValue: string | null) => {
    setFilters((state) => ({
      ...state,
      lecturer: searchValue,
      pageNumber: 1,
      pageSize: 5,
    }));
  };
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

  return { filters, onChangePage, onChangeRowsPerPage, onSearch };
};

export default useFilterSlotPreference;
