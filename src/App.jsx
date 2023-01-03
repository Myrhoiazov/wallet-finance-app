// import Container from "shared/components/Container";
import AuthPage from 'pages/AuthPage';
import SharedLayoutPage from './pages/SharedLayoutPage/SharedLayoutPage';

// import { lazy, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'shared/components/PrivateRoute';
import PublicRoute from 'shared/components/PublicRoute';
import DashboardPage from 'pages/DashboardPage';
// import { authActions } from 'redux/auth/auth.slice';
// import authSelectors from 'redux/auth/selector.auth';

// const AuthPage = lazy(() => import('pages/AuthPage'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayoutPage />}>
        <Route path="/" element={<PrivateRoute />}>
          {/* <Route index element={<HomeTab />} /> */}
          {/* <Route path="planning" element={<PlanningPage />} /> */}
          {/* <Route path="awards" element={<AwardsPage />} /> */}
        </Route>
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/" element={<PublicRoute restricted />}>
          <Route path="auth" element={<AuthPage />} />
        </Route>

        {/* <Route path="/contacts" element={<ContactsPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Route>
    </Routes>
  );
  // );
};

export default App;
