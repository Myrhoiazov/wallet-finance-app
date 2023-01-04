import React from 'react';
import s from './Table.module.scss';

const Table = () => {
  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const colorPalette = [
    '#FED057',
    '#FFD8D0',
    '#FD9498',
    '#C5BAFF',
    '#6E78E8',
    '#4A56E2',
    '#81E1FF',
    '#24CCA7',
    '#00AD84',
  ];

  const yearsList = [2023, 2022, 2021];

  const mockData = [
    {
      color: 'green',
      category: 'Main expenses',
      value: 8700.0,
    },
    {
      color: 'red',
      category: 'Products',
      value: 3800.74,
    },
  ];

  const monthChangeHandle = event => {
    console.log(event.target.value);
  };

  const yearChangeHandle = event => {
    console.log(event.target.value);
  };

  return (
    <>
      <div>
        <select name="month" onChange={monthChangeHandle}>
          {monthsList.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select name="year" onChange={yearChangeHandle}>
          {yearsList.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className={s.table}>
        <div className={s.tableHeader}>
          <p>Category</p>
          <p>Sum</p>
        </div>
        <ul className={s.tableBody}>
          {mockData.map(item => (
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
            <p>{mockData.reduce((a, b) => a.value + b.value)}</p>
          </div>
          <div className={s.tableTotalDataIncome}>
            <p>Income:</p>
            <p>{'Mock'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
