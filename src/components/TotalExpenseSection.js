import React from 'react';
import { useTranslation } from "react-i18next";

function TotalExpenseSection({ totalOutflow }) {
  const { t } = useTranslation('translation');

  return (
    <div>
      <label className="headline">{t('Total Expense')}</label>
      <input name="Total" value={totalOutflow} type="number" readOnly />
    </div>
  );
}

export default TotalExpenseSection;
