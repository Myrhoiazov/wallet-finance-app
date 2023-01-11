import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import s from './DoughnutChart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  let chartData;
  if (data) {
    chartData = {
      datasets: [
        {
          data: data.expenseTransactions.map(item => item.amount),
          backgroundColor: data.expenseTransactions.map(item => item.color),
          borderWidth: 0,
        },
      ],
    };
  } else {
    chartData = {
      datasets: [
        {
          data: [0.01],
          backgroundColor: ['gray'],
          borderWidth: 0,
        },
      ],
    };
  }

  return (
    <div className={s.wrapper}>
      <Doughnut
        data={chartData}
        options={{ cutout: '70%' }}
        className={s.doughnutChart}
      />
      <p>₴ {data?.expense.toFixed(2) || '-- No data --'}</p>
    </div>
  );
};

export default DoughnutChart;
