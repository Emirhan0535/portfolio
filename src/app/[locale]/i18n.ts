import {getTranslations} from 'next-intl/server';

export async function getMessages(locale: string) {
  return getTranslations(locale);
} 