'use client';

import { useState, useEffect } from 'react';
import { getTranslations, type Locale } from '../translations';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState(getTranslations('en'));

  useEffect(() => {
    const savedLocale = (localStorage.getItem('locale') || 'en') as Locale;
    setLocale(savedLocale);
    setTranslations(getTranslations(savedLocale));
  }, []);

  return {
    t: translations,
    locale,
    setLocale: (newLocale: Locale) => {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
      setTranslations(getTranslations(newLocale));
    }
  };
} 