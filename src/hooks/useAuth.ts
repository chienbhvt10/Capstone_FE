import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from '../contexts/Auth';

const useAuth = (): AuthContextValue => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Forgot to wrap component in AuthContext');
  }

  return authContext;
};

export default useAuth;
