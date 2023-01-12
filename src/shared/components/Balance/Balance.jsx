
import { useSelector } from 'react-redux';
import userSelectors from 'redux/User/SelectorUser';
import s from './Balance.module.scss';

const Balance = () => {
  const balance = useSelector(userSelectors.getUserBalance);


  return (
    <div className={s.wrapper}>
      <p className={s.title}>Your balance</p>
      <p className={s.balance}><span className={s.symbol}>&#8372;</span> { balance || 0}</p>
    </div>
  );
};

export default Balance;
