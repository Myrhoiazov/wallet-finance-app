import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import s from './DoughnutChart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, income }) => {
  const chartData = {
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={s.wrapper}>
      <Doughnut
        data={chartData}
        options={{ cutout: '70%' }}
        className={s.doughnutChart}
      />
      <p>₴ {income.toFixed(2)}</p>
    </div>
  );
};

export default DoughnutChart;
