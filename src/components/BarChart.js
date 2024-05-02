import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {updateData, changeLanguage} from '../store/index';
import { useTranslation } from "react-i18next";

function BarChart() {
  const { data } = useSelector(state => state.chart);
  const {t} = useTranslation('translation');

  const inflowTotal = data.inflow.total;
  const outflowCategories = Object.keys(data.outflow).filter(key => key !== 'total');
  const outflowCategoriesTranslated = outflowCategories.map(category => t(category));
  const outflowData = Object.values(data.outflow);
  const totalOutflow = data.outflow.total;


  const chartData = {
    labels: [t('Inflow'), t('Outflow'), ...outflowCategoriesTranslated], // Labels for inflow and outflow
    datasets: [
      {
        label: t('Inflow Total'),
        backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        data: [inflowTotal], 
        borderColor: ['rgb(255, 205, 86)', 'rgb(54, 162, 235)'],
        borderWidth: 1,
        stack: 'stack1', 
      },
      {
        label: t('Outflow Total'),
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        data: [0, totalOutflow], 
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        stack: 'stack1', 
      },
      {
        label: t('Outflow Categories'),
        backgroundColor: 'pink', 
        data: [0, 0, ...outflowData], 
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        stack: 'stack1', 
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



