import React from 'react';

import s from './Table.module.scss';

const Table = ({ data, income }) => {
  return (
    <>
      <div className={s.table}>
        <div className={s.tableHeader}>
          <p>Category</p>
          <p>Sum</p>
        </div>
        <ul className={s.tableBody}>
          {data.map(item => (
            <li className={s.tableBodyItem} key={item.category}>
              <span
                className={s.tableBodyItemColor}
                style={{ backgroundColor: item.color }}
              ></span>
              <p className={s.tableBodyItemCategory}>{item.category}</p>
              <p className={s.tableBodyItemValue}>{item.value.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className={s.tableTotalData}>
          <div className={s.tableTotalDataExpenses}>
            <p>Expenses:</p>
            <p>{data.reduce((a, b) => a.value + b.value)}</p>
          </div>
          <div className={s.tableTotalDataIncome}>
            <p>Income:</p>
            <p>{income.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
