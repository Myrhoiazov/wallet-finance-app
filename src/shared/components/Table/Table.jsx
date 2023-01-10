import React from 'react';

import s from './Table.module.scss';

const Table = ({ data }) => {
  return (
    <>
      <div className={s.table}>
        <div className={s.tableHeader}>
          <p>Category</p>
          <p>Sum</p>
        </div>
        <ul className={s.tableBody}>
          {data?.expenseTransactions.map(item => (
            <li className={s.tableBodyItem} key={item.category}>
              <span
                className={s.tableBodyItemColor}
                style={{ backgroundColor: item?.color }}
              ></span>
              <p className={s.tableBodyItemCategory}>{item.category}</p>
              <p className={s.tableBodyItemValue}>{item.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className={s.tableTotalData}>
          <div className={s.tableTotalDataExpenses}>
            <p>Expenses:</p>
            <p>{data?.expense.toFixed(2) || '-- No data --'}</p>
          </div>
          <div className={s.tableTotalDataIncome}>
            <p>Income:</p>
            <p>{data?.income.toFixed(2) || '-- No data --'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
