import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../slices/user';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();
  const shouldRedirect =
    (!onlyUnAuth && !isAuthChecked) || (onlyUnAuth && isAuthChecked);

  return shouldRedirect ? (
    <Navigate
      replace
      to={onlyUnAuth ? location.state?.from || '/' : '/login'}
      state={{ from: location }}
    />
  ) : (
    children
  );
};

export default ProtectedRoute;
