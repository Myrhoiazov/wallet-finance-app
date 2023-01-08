import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import authSelectors from 'redux/Auth/SelectorAuth';
import { fetchTransactions } from 'redux/Transaction/transactionsOperations';
import Balance from '../Balance';
import HomeTab from '../HomeTab';
import Navigation from '../Navigation';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useDispatch();
   const token = useSelector(authSelectors.getToken);

  useEffect(() => {
    if (token) {

      dispatch(fetchTransactions());
    }
  }, [token,dispatch]);

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.dashboardInfo}>
            <Navigation />
            <Balance />
        </div>
        {!isMobile && <div className={s.currencyInfo}> Temporary Currency</div>}
      </div>

      <div className={s.content}>
      <HomeTab/>
      </div>

      <div className={s.vector}></div>
      <div className={s.decorFirst}></div>
      <div className={s.decorSecond}></div>
    </div>
  );
};

export default Dashboard;
