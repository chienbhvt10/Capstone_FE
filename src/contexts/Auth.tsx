import { createContext, useEffect, useState } from 'react';
import useRefresh from '~/hooks/useRefresh';
import LocalStorage from '~/utils/LocalStorage';
import { User } from '~/utils/types';

export interface AuthContextValue {
  refetch: React.DispatchWithoutAction;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

if (process.env.NODE_ENV === 'development') {
  AuthContext.displayName = 'ArrangeContext';
}

const AuthProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [refresh, refetch] = useRefresh();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = LocalStorage.get('currentUser');
    if (user) {
      setUser(user);
    }
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        refetch,
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthConsumer, AuthProvider, AuthContext as default };
