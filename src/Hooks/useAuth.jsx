import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

export const UseAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
