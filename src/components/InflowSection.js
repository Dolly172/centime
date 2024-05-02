import React from 'react';
import { useTranslation } from "react-i18next";

function InflowSection({ inflow, handleInputChange, handleDeleteEntry }) {
  const { t } = useTranslation('translation');

  return (
    <div className="bills">
      <span>{t('Inflow')}:</span>
      {Object.keys(inflow).map((val) => (
        <span key={val}>
          <label>{t(val)}</label>
          <input name={val} value={inflow[val]} type="number" onChange={handleInputChange} data-testid={`inflow_${val}`}/>
          <button onClick={() => handleDeleteEntry('inflow', val)}>D</button>
        </span>
      ))}
    </div>
  );
}

export default InflowSection;
