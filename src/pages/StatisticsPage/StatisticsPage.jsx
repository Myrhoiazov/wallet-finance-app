import { TtyRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectTransactions } from 'redux/Transaction/transactionsSelectors';
import Balance from 'shared/components/Balance';
import Container from 'shared/components/Container';

import CustomSelect from 'shared/components/CustomSelect/CustomSelect';
import DoughnutChart from 'shared/components/DoughnutChart/DoughnutChart';
import Header from 'shared/components/Header';
import Navigation from 'shared/components/Navigation';
import Table from 'shared/components/Table/Table';
import s from './StatisticsPage.module.scss';
import { transactionsAPI } from '../../services/TransactionsApi';

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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    const lastTrTime = getLastTransactionTime(transactions);
    const lastTrDate = getMonthAndYear(lastTrTime);
    transactionsAPI
      .getTransactionsByDate(lastTrDate)
      .then(resp => console.log(resp));
  }, []);

  const getMonthAndYear = time => {
    return {
      year: new Date(time * 1000).getFullYear(),
      month: new Date(time * 1000).getMonth() + 1,
    };
  };

  const getLastTransactionTime = transactions => {
    return Math.max(...transactions.map(item => item.date));
  };

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

  const monthChangeHandle = month => setSelectedMonth(month);

  const yearChangeHandle = year => setSelectedYear(year);

  return (
    <>
      <Header />
      <div className={s.mainWrapper}>
        <div className={s.dashboardWrapper}>
          <div className={s.inner}>
            <div className={s.dashboardInfo}>
              <Navigation />
              <Balance />
            </div>
          </div>
          {!isMobile && (
            <div className={s.currencyInfo}> Temporary Currency</div>
          )}
        </div>

        {viewData && (
          <div className={s.dataWrapper}>
            <div className={s.doughnutWrapper}>
              <p className={s.title}>Statistics</p>
              <DoughnutChart data={mockData} income={100} />
            </div>
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

        <div className={s.vector}></div>
      </div>
    </>
  );
};

export default StatisticsPage;
