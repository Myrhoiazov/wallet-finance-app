
import s from './Balance.module.scss';

const Balance = () => {

  return (
    <div className={s.wrapper}>
      <p className={s.title}>Your balance</p>
      <p className={s.balance}><span className={s.symbol}>&#8372;</span> 24000</p>
    </div>
  );
};

export default Balance;
