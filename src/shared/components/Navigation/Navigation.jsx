import { NavLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as StatisticIcon } from '../../../assets/images/icons/statistics-icon.svg';
import { ReactComponent as StatisticIconActive } from '../../../assets/images/icons/statistics-icon-active.svg';
import { ReactComponent as HomeIcon } from '../../../assets/images/icons/home-icon.svg';
import { ReactComponent as HomeIconActive } from '../../../assets/images/icons/home-icon-active.svg';
import { ReactComponent as HomeIconMobile } from '../../../assets/images/icons/home-icon-mobile.svg';
import { ReactComponent as HomeIconMobileActive } from '../../../assets/images/icons/home-icon-mobile-active.svg';
import { ReactComponent as StatisticIconMobile } from '../../../assets/images/icons/statistics-icon-mobile.svg';
import { ReactComponent as StatisticIconMobileActive } from '../../../assets/images/icons/statistics-icon-mobile-active.svg';
import { ReactComponent as CurrencyIconMobile } from '../../../assets/images/icons/currency-icon-mobile.svg';
import { ReactComponent as CurrencyIconMobileActive } from '../../../assets/images/icons/currency-icon-mobile-active.svg';
import s from './Navigation.module.scss';

const Navigation = () => {
  const getActiveClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };
  const location = useLocation();
  const { pathname } = location;
  console.log('pathname', pathname)

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.wrapper}>
      {isMobile && (
        <nav className={s.navigation}>
          <NavLink to="/home" className={getActiveClassName}>
            {pathname === '/home' ? <HomeIconMobileActive className={s.activeIconMob} /> : <HomeIconMobile className={s.icon} />}
          </NavLink>
          <NavLink to="/diagram" className={getActiveClassName}>
            {pathname === '/diagram' ? <StatisticIconMobileActive className={s.activeIconMob}/> : <StatisticIconMobile className={s.icon} />}

          </NavLink>
          <NavLink to="/currency" className={getActiveClassName}>
            {pathname === '/currency' ? <CurrencyIconMobileActive className={s.activeIconMob}/> : <CurrencyIconMobile className={s.icon}  />}
          </NavLink>
        </nav>
      )}
      {!isMobile && (
        <nav className={s.navigation}>
          <NavLink to="/home" className={getActiveClassName}>
            {pathname === '/home' ? <HomeIconActive className={s.activeIcon} /> : <HomeIcon className={s.icon} />}
            <span className={s.text}>Home</span>
          </NavLink>
          <NavLink to="/diagram" className={getActiveClassName}>
            {pathname === '/diagram' ? <StatisticIconActive className={s.activeIcon} /> :  <StatisticIcon className={s.icon} />}
            <span className={s.text}>Statistics</span>
          </NavLink>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
