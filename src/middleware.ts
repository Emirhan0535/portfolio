import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const nextIntlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

export function middleware(request: NextRequest) {
  // IP adresini al
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || '';
  
  // İspanya IP aralıkları (örnek olarak)
  const spanishIpRanges = [
    '2.136.0.0/13',
    '2.152.0.0/14',
    '5.224.0.0/13',
    '31.4.128.0/17',
    '37.14.32.0/19',
  ];
  
  // IP'nin İspanya'dan olup olmadığını kontrol et
  const isSpanishIP = spanishIpRanges.some(range => {
    const [prefix, bits] = range.split('/');
    const mask = ~((1 << (32 - parseInt(bits))) - 1);
    const ipNum = ip.split('.').reduce((acc: number, octet: string) => (acc << 8) + parseInt(octet), 0);
    const rangeNum = prefix.split('.').reduce((acc: number, octet: string) => (acc << 8) + parseInt(octet), 0);
    return (ipNum & mask) === (rangeNum & mask);
  });

  // Mevcut URL'yi analiz et
  const url = new URL(request.url);
  
  // Eğer locale parametresi yoksa ve İspanya IP'si ise İspanyolca'ya yönlendir
  if (!url.pathname.startsWith('/es') && !url.pathname.startsWith('/en')) {
    if (isSpanishIP) {
      return NextResponse.redirect(new URL('/es' + url.pathname, request.url));
    } else {
      return NextResponse.redirect(new URL('/en' + url.pathname, request.url));
    }
  }
  
  // next-intl middleware'ini çalıştır
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 