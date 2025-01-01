'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '../hooks/useTranslation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, setLocale } = useTranslation();

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    setLocale(newLocale);
    router.refresh();
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {locale === 'en' ? '🇺🇸' : '🇪🇸'}
    </button>
  );
} 