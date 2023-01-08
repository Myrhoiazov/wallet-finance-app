import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as StatisticIcon } from '../../../assets/images/icons/statistics-icon.svg';
import { ReactComponent as HomeIcon } from '../../../assets/images/icons/home-icon.svg';
import { ReactComponent as HomeIconMobile } from '../../../assets/images/icons/home-icon-mobile.svg';
import { ReactComponent as StatisticIconMobile } from '../../../assets/images/icons/statistics-icon-mobile.svg';
import { ReactComponent as CurrencyIconMobile } from '../../../assets/images/icons/currency-icon-mobile.svg';
import s from './Navigation.module.scss';

const Navigation = () => {
  const getActiveClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.wrapper}>
      {isMobile && (
        <nav className={s.navigation}>
          <NavLink to="/home" className={getActiveClassName}>
            <HomeIconMobile className={s.icon} />
          </NavLink>
          <NavLink to="/diagram" className={getActiveClassName}>
            <StatisticIconMobile className={s.icon} />
          </NavLink>
          <NavLink to="/currency" className={getActiveClassName}>
            <CurrencyIconMobile className={s.icon} />
          </NavLink>
        </nav>
      )}
      {!isMobile && (
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
      )}
    </div>
  );
};

export default Navigation;
