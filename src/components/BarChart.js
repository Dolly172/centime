import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {updateData, changeLanguage} from '../store/index';
import { useTranslation } from "react-i18next";

function BarChart() {
  const { data } = useSelector(state => state.chart);
  const {t} = useTranslation('translation');

  const chartData = {
    labels: ['Inflow', 'Outflow'], 
    datasets: [
      {
        label: t('Salary'),
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        data: [data.inflow, 0], 
        borderColor: 'rgb(255, 205, 86)',
        borderWidth: 1,
      },
      {
        label: t('Total Expense'),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        data: [0, data.outflow.Total], 
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
      {
        label: t('Bills'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        data: [0, data.outflow.Bills], 
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: t('Miscellenous'),
        backgroundColor: 'rgba(255, 205, 86, 0.2)', 
        data: [0, data.outflow.Misc], 
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const titleText = t('Inflow and Outflow Data');

  const options = {
    plugins: {
      title: {
        display: true,
        text: titleText
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: false,
      },
    },
  };
  

  return (
    <div className='chart'>
      <Bar 
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default BarChart;



