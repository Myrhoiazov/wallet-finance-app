import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/Auth/SelectorAuth';

const PublicRoute = ({ restricted = false }) => {
  const token = useSelector(authSelectors.getToken);
  const shouldRedirect = token && restricted;

  return shouldRedirect ? <Navigate to="/home" /> : <Outlet />;
};

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
};

export default PublicRoute;
