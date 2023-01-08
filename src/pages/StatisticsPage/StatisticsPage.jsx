import React, { useState } from 'react';

import CustomSelect from 'shared/components/CustomSelect/CustomSelect';
import DoughnutChart from 'shared/components/DoughnutChart/DoughnutChart';
import Table from 'shared/components/Table/Table';
import s from './StatisticsPage.module.scss';

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

const StatisticsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(undefined);
  const [selectedYear, setSelectedYear] = useState(undefined);
  const [viewData, serViewData] = useState(mockData);

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
    '#AD5C23',
  ];

  const yearsList = [2023, 2022, 2021];

  const monthChangeHandle = month => setSelectedMonth(month);

  const yearChangeHandle = year => setSelectedYear(year);

  return (
    <>
      {viewData && (
        <div className={s.mainWrapper}>
          <DoughnutChart data={mockData} income={100} />
          <div className={s.tableWrapper}>
            <div className={s.selectWrapper}>
              <CustomSelect
                options={monthsList}
                changeHandler={monthChangeHandle}
                name={'month'}
              />
              <CustomSelect
                options={yearsList}
                changeHandler={yearChangeHandle}
                name={'year'}
              />
            </div>
            <Table data={mockData} income={100} />
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsPage;
