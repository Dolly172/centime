import React from 'react';
import { useTranslation } from "react-i18next";

function AddEntry({ newEntry,handleCategoryChange, handleAmountChange, handleTypeChange, handleAddNewEntry }) {
  const { t } = useTranslation('translation');

  return (
    <div className="add-entry">
            <div>{t('Add Entry')}</div>
            <label>{t('Category')}</label>
            <input type="text" value={newEntry.category} onChange={handleCategoryChange} />
            <label>{t('Amount')}</label>
            <input type="number" value={newEntry.amount} onChange={handleAmountChange} />
            <label>{t('Type')}</label>
            <select value={newEntry.type} onChange={handleTypeChange}>
              <option value="inflow">{t('Inflow')}</option>
              <option value="outflow">{t('Outflow')}</option>
            </select>
            <button onClick={handleAddNewEntry}>{t('Add')}</button>
          </div>
  );
}

export default AddEntry;
