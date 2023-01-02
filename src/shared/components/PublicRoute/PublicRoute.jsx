import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import authSelectors from 'redux/auth/selector.auth';

const PublicRoute = ({ restricted = false }) => {
  // const token = useSelector(authSelectors.getToken);
  // return token && restricted ? <Navigate to="/"></Navigate> : <Outlet />;
};

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
};

export default PublicRoute;