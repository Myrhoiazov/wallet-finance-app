
import { useMediaQuery } from 'react-responsive';

import Balance from '../Balance';
import Currency from '../Currency';
import HomeTab from '../HomeTab';
import Navigation from '../Navigation';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.dashboardInfo}>
            <Navigation />
            <Balance />
            <Currency />
        </div>
        {!isMobile && <div className={s.currencyInfo}>  Currency</div>}
      </div>

      <div className={s.content}>
      <HomeTab/>
      </div>

      <div className={s.vector}></div>
    </div>
  );
};

export default Dashboard;
