import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getAuth } from './auth';

const PrivateRoutes = ({ children }) => {
  const token = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token && (router.pathname === '/auth/register' || router.pathname === '/auth/login')) {
      router.replace(router.pathname);
    } else {
      if (token) {
        return (
          <>
            {children}
          </>
        );
      }
      router.replace('/auth/login');
    }
  }, [token]);

  return <>{children}</>;
};

export default PrivateRoutes;
