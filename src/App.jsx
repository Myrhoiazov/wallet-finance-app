
import LoginPage from './pages/AuthPage/LoginPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage/RegisterPage';
import SharedLayoutPage from './pages/SharedLayoutPage/SharedLayoutPage';

// import { lazy, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useSearchParams } from 'react-router-dom';
// import PrivateRoute from 'shared/components/PrivateRoute';
import PublicRoute from 'shared/components/PublicRoute';
import authSelectors from 'redux/Auth/SelectorAuth';
import { authActions } from 'redux/Auth/AuthSlice';
import userOperations from 'redux/User/OperationsUser';


// const AuthPage = lazy(() => import('./pages/AuthPage'));

const App = () => {
  // const dispatch = useDispatch();
  // const token = useSelector(authSelectors.getToken);
  // const [searchParams] = useSearchParams();
  // const tokenGoogle = searchParams.get('token');
  // useEffect(() => {
  //     if (token) {
  //         dispatch(userOperations.getUserInfo());
  //     }
  // }, [dispatch, token]);

  // useEffect(() => {
  //     if (tokenGoogle) {
  //         dispatch(authActions.setToken(tokenGoogle));
  //     }
  // }, [tokenGoogle, dispatch]);
  return (
    <Routes>
      <Route path="/" element={<SharedLayoutPage />}>
        {/* <Route path="/" element={<PrivateRoute />}> */}
          {/* <Route path="" element={<HomePage />} /> */}
          {/* <Route path="planning" element={<PlanningPage />} /> */}
          {/* <Route path="awards" element={<AwardsPage />} /> */}
        {/* </Route> */}
        <Route path="/" element={<PublicRoute restricted />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* <Route path="/contacts" element={<ContactsPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Route>
    </Routes>
  );
  // );
};

export default App;
