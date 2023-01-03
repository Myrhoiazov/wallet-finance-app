import { NavLink } from 'react-router-dom';
import { ReactComponent as StatisticIcon } from '../../../assets/images/icons/statistics-icon2.svg';
import { ReactComponent as HomeIcon } from '../../../assets/images/icons/home-icon2.svg';
import s from './Navigation.module.scss';

const Navigation = () => {
  const getActiveClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };
  return (
    <div className={s.wrapper}>
      <nav className={s.navigation}>
        <NavLink to="/home" className={getActiveClassName}>
          <HomeIcon className={s.icon} />
          <span className={s.text}>Home</span>
        </NavLink>
        <NavLink to="/diagram" className={getActiveClassName}>
          <StatisticIcon className={s.icon} />
          <span className={s.text}>Statistics</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
