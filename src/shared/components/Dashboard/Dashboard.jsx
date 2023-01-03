import Balance from '../Balance';
import Navigation from '../Navigation';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <div className={s.dashboardInfo}>
          <div>
            <Navigation />
          </div>
          <div>
            <Balance />
          </div>
        </div>
        <div className={s.currencyInfo}></div>
      </div>

      <div className={s.content}> This is dynamic content</div>

      <div className={s.vector}></div>
      <div className={s.decorFirst}></div>
      <div className={s.decorSecond}></div>
    </div>
  );
};

export default Dashboard;
