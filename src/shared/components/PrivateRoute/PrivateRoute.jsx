import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import authSelectors from 'redux/auth/selector.auth';

const PrivateRoute = () => {
    // const token = useSelector(authSelectors.getToken);
    // return token ? <Outlet /> : <Navigate to="/auth" />;
};



export default PrivateRoute;