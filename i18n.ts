import {getRequestConfig} from 'next-intl/server';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {locales} from '@/config';

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});

export default getRequestConfig(async ({locale}) => {
  const requestLocale = locale;
  return {
    locale: requestLocale,
    messages: (await import(`./messages/${requestLocale}.json`)).default,
    timeZone: 'Europe/Istanbul'
  };
}); 