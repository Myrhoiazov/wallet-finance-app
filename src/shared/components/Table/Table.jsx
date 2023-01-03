import React from 'react';

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

  const yearsList = [2023, 2022, 2021];

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
    </>
  );
};

export default Table;
