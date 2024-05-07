import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from "react-google-charts";
import { updateData, changeLanguage } from '../store/index';
import { useTranslation } from "react-i18next";

function SankeyDiagram() {
  const { data } = useSelector(state => state.chart);
  const { t } = useTranslation('translation');

  const inflowTotal = data.inflow.total;
  const outflowCategories = Object.keys(data.outflow).filter(key => key !== 'total');
  const outflowCategoriesTranslated = outflowCategories.map(category => t(category));
  const outflowData = Object.values(data.outflow);
  const totalOutflow = data.outflow.total;

  const chartData = [
    ['From', 'To', 'Value'],
    ...outflowCategories.map((category, index) => [t('Inflow'), outflowCategoriesTranslated[index], outflowData[index]])
  ];

  const titleText = t('Inflow and Outflow Data');

  const chartOptions = {
    title: titleText,
    legend: { position: 'top' }
  };

  return (
    <div className='chart'>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default SankeyDiagram;
