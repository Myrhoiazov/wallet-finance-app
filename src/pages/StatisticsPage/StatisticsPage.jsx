import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Balance from 'shared/components/Balance';
import Container from 'shared/components/Container';
import CustomSelect from 'shared/components/CustomSelect/CustomSelect';
import DoughnutChart from 'shared/components/DoughnutChart/DoughnutChart';
import Header from 'shared/components/Header';
import Navigation from 'shared/components/Navigation';
import Table from 'shared/components/Table/Table';
import s from './StatisticsPage.module.scss';
import { transactionsAPI } from '../../services/TransactionsApi';
import { selectTransactions } from 'redux/Transaction/transactionsSelectors';
import { selectTransactionCategories } from 'redux/Categories/categoriesSelectors';

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

const yearss = [2023, 2022, 2021];

const StatisticsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedMonth, setSelectedMonth] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [selectedYear, setSelectedYear] = useState(undefined);
  const [viewData, setViewData] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [yearsList, setYearsList] = useState(yearss);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const categories = useSelector(selectTransactionCategories);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    const lastTrTime = getLastTransactionTime(transactions);
    const lastTrDate = getMonthAndYear(lastTrTime);
    setSelectedMonth(lastTrDate.month);
    setSelectedYear(lastTrDate.year);
    getYearsList();
    transactionsAPI
      .getTransactionsByDate(lastTrDate)
      .then(resp => setViewData(generateViewData(resp.data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMonthAndYear = time => {
    return {
      year: new Date(time).getFullYear(),
      month: new Date(time).getMonth() + 1,
    };
  };

  const getLastTransactionTime = transactions => {
    return Math.max(...transactions.map(item => item.date));
  };

  const getYearsList = () => {
    transactionsAPI.getUnlimitedTransactions().then(({ data }) => {
      const a = data.transactions.map(
        transaction => getMonthAndYear(transaction.date).year
      );
      console.log(a);
    });
  };

  const generateViewData = ({ incomeSum, expenseSum, transactions }) => {
    const onlyExpense = transactions.filter(item => item.type === 'expense');
    const expenseByCategories = [];
    onlyExpense.forEach(item => {
      const isCategoryPresent = !!expenseByCategories.find(
        expense => expense.category === item.category
      );
      if (isCategoryPresent) {
        const categoryIDX = expenseByCategories.findIndex(
          category => category.category === item.category
        );
        expenseByCategories[categoryIDX] = {
          category: item.category,
          amount: expenseByCategories[categoryIDX].amount + item.amount,
          color: expenseByCategories[categoryIDX].color,
        };
      } else {
        expenseByCategories.push({
          category: item.category,
          amount: +item.amount,
          color: categories.find(category => category.value === item.category)
            .color,
        });
      }
    });
    return {
      income: +incomeSum,
      expense: +expenseSum,
      expenseTransactions: expenseByCategories,
    };
  };

  const monthChangeHandle = month => setSelectedMonth(month);
  const yearChangeHandle = year => setSelectedYear(year);

  return (
    <>
      <Header />
      <Container>
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
                <DoughnutChart data={viewData} />
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
                <Table data={viewData} />
              </div>
            </div>
          )}

          <div className={s.vector}></div>
        </div>
      </Container>
    </>
  );
};

export default StatisticsPage;
