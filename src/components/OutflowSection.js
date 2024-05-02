import React from 'react';
import { useTranslation } from "react-i18next";

function OutflowSection({ outflow, handleInputChange, handleDeleteEntry }) {
  const { t } = useTranslation('translation');

  return (
    <div className="bills">
      <span>{t('Outflow')}:</span>
      {Object.keys(outflow).map((val) => (
        <span key={val}>
          <label>{t(val)}</label>
          <input name={val} value={outflow[val]} type="number" onChange={handleInputChange} data-testid={`outflow_${val}`} />
          <button onClick={() => handleDeleteEntry('outflow', val)}>D</button>
        </span>
      ))}
    </div>
  );
}

export default OutflowSection;
