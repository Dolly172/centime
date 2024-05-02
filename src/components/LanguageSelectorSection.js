import React from 'react';
import { useTranslation } from "react-i18next";

function LanguageSelectorSection({ languages, handleLanguageChange }) {
  const { t } = useTranslation('translation');

  return (
    <div>
      <span>{t('Languages')}:</span> 
      <select onChange={handleLanguageChange}>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelectorSection;
