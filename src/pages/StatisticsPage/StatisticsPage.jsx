import React from 'react';

import DoughnutChart from 'shared/components/DoughnutChart/DoughnutChart';
import Table from 'shared/components/Table/Table';
import s from './StatisticsPage.module.scss';

const StatisticsPage = () => {
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
      <div className={s.doughnutChart}>
        <DoughnutChart data={mockData}></DoughnutChart>
      </div>
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
      <Table data={mockData} income={'Mock'}></Table>
    </>
  );
};

export default StatisticsPage;
