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

const months = [
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

const StatisticsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(undefined);
  const [selectedYear, setSelectedYear] = useState(undefined);
  const [viewData, setViewData] = useState(undefined);
  const [yearsList, setYearsList] = useState(undefined);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const categories = useSelector(selectTransactionCategories);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    const lastTrTime = getLastTransactionTime(transactions);
    const lastTrDate = getMonthAndYear(lastTrTime);
    setSelectedMonth(months[lastTrDate.month - 1]);
    setSelectedYear(lastTrDate.year);
    getYearsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setViewData(undefined);
    const currentTime = getMonthAndYear(Date.now());
    if (
      selectedMonth &&
      selectedYear &&
      !(
        currentTime.month < months.indexOf(selectedMonth) + 1 &&
        currentTime.year === +selectedYear
      )
    ) {
      transactionsAPI
        .getTransactionsByDate(months.indexOf(selectedMonth) + 1, selectedYear)
        .then(resp => {
          if (resp.data.transactions?.length > 0)
            setViewData(generateViewData(resp.data));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);

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
    transactionsAPI.getTransactionsTimes().then(({ data }) => {
      const uniqueYears = [];
      data.dates.forEach(item => {
        const year = getMonthAndYear(item.date).year;
        if (!uniqueYears.includes(year)) uniqueYears.push(year);
      });
      uniqueYears.sort((a, b) => b - a);
      setYearsList(uniqueYears);
      setSelectedYear(uniqueYears[0]);
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
          {yearsList && (
            <div className={s.dataWrapper}>
              <div className={s.doughnutWrapper}>
                <p className={s.title}>Statistics</p>
                <DoughnutChart data={viewData} />
              </div>
              <div className={s.tableWrapper}>
                <div className={s.selectWrapper}>
                  <CustomSelect
                    options={months}
                    changeHandler={setSelectedMonth}
                    name={'month'}
                  />
                  <CustomSelect
                    options={yearsList}
                    changeHandler={setSelectedYear}
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
