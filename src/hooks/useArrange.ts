import type { ArrangeContextValue } from '../contexts/Arrange';
import ArrangeContext from '../contexts/Arrange';
import { useContext } from 'react';

const useArrange = (): ArrangeContextValue => {
  const arrangeContext = useContext(ArrangeContext);

  if (!arrangeContext) {
    throw new Error('Forgot to wrap component in ArrangeContext');
  }

  return arrangeContext;
};

export default useArrange;
