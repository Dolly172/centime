import React from 'react';
import { useTranslation } from "react-i18next";

function RemainingSection({ remaining }) {
  const { t } = useTranslation('translation');

  return (
    <div>
      <label className="headline">{t('Remaining')}</label>
      <input name="remaining" value={remaining} type="number" readOnly />
    </div>
  );
}

export default RemainingSection;
