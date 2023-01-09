import React, { Suspense } from 'react';
import LoginPage from './pages/AuthPage/LoginPage/LoginPage';
import RegisterPage from './pages/AuthPage/RegisterPage/RegisterPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import PrivateRoute from 'shared/components/PrivateRoute';
import PublicRoute from 'shared/components/PublicRoute';
import authSelectors from 'redux/Auth/SelectorAuth';
import { authActions } from 'redux/Auth/AuthSlice';
import userOperations from 'redux/User/OperationsUser';
import DashboardPage from 'pages/DashboardPage';
// import Container from 'shared/components/Container';
import NotFoundPage from 'pages/NotFoundPage';

// const AuthPage = lazy(() => import('./pages/AuthPage'));

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.getToken);
  const [searchParams] = useSearchParams();
  const tokenGoogle = searchParams.get('token');
  useEffect(() => {
    if (token) {
      dispatch(userOperations.getUserInfo());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (tokenGoogle) {
      dispatch(authActions.setToken(tokenGoogle));
    }
  }, [tokenGoogle, dispatch]);

  return (
    <>
      <Suspense fallback={null}>
        {/* <Container> */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>

            <Route path="/login" element={<PublicRoute restricted />}>
              <Route index element={<LoginPage />} />
            </Route>

            <Route path="/register" element={<PublicRoute restricted />}>
              <Route index element={<RegisterPage />} />
            </Route>

            <Route path="/home" element={<PrivateRoute redirectTo="/login" />}>
              <Route index element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        {/* </Container> */}
      </Suspense>
    </>
  );
};

export default App;
