import s from './ButtonAddTransactions.module.scss';

export const ButtonAddTransactions = ({ onModalOpen }) => {
  return (
    <button
      className={s.btnAddTransaction}
      onClick={onModalOpen}
      type="button"
    ></button>
  );
};
