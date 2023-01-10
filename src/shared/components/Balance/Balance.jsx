
import { useSelector } from 'react-redux';
import { selectTransactions } from 'redux/Transaction/transactionsSelectors';
import userSelectors from 'redux/User/SelectorUser';
import s from './Balance.module.scss';

const Balance = () => {
  const balance = useSelector(userSelectors.getUserBalance);
  console.log('balance', balance)
  const transactions = useSelector(selectTransactions);

  return (
    <div className={s.wrapper}>
      <p className={s.title}>Your balance</p>
      <p className={s.balance}><span className={s.symbol}>&#8372;</span> {balance || transactions?.[0]?.actualBalance}</p>
    </div>
  );
};

export default Balance;
