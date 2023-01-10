import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/Auth/SelectorAuth';

const PrivateRoute = ({ redirectTo }) => {
  const token = useSelector(authSelectors.getToken);
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
