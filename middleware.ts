import createMiddleware from 'next-intl/middleware';
import { locales } from './src/config';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: [
    '/',
    '/(en|es)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
}; 