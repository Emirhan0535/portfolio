'use client';

import { useLocale } from 'next-intl';
import { Link } from '../../i18n';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const switchLocale = locale === 'en' ? 'es' : 'en';

  return (
    <Link
      href="/"
      locale={switchLocale}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {locale === 'en' ? '🇪🇸' : '🇬🇧'}
    </Link>
  );
} 