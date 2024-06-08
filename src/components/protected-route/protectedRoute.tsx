import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/slicers/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from.pathname} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
