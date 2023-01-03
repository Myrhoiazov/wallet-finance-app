import { useMediaQuery } from 'react-responsive';
import Balance from '../Balance';
import Navigation from '../Navigation';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.dashboardInfo}>
          {/* <div> */}
            <Navigation />
          {/* </div> */}
          {/* <div> */}
            <Balance />
          {/* </div> */}
        </div>
        {!isMobile && <div className={s.currencyInfo}> Temporary Currency</div>}
      </div>

      <div className={s.content}> This is dynamic content</div>

      <div className={s.vector}></div>
      <div className={s.decorFirst}></div>
      <div className={s.decorSecond}></div>
    </div>
  );
};

export default Dashboard;
