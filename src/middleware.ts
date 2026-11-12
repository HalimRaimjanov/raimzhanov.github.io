import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const explicit = path.match(/^\/(en|ky)(?=\/|$)/)?.[1];
  const cookie = request.cookies.get('site_language')?.value;
  const device = request.headers.get('accept-language')?.split(',')[0]?.split(';')[0]?.trim().split('-')[0];
  const locale = explicit ?? (['ru', 'en', 'ky'].includes(cookie ?? '') ? cookie : device === 'en' || device === 'ky' ? device : 'ru') ?? 'ru';
  const headers = new Headers(request.headers);
  headers.set('x-site-language', locale);
  const target = request.nextUrl.clone();
  if (!explicit && locale !== 'ru') target.pathname = `/${locale}${path === '/' ? '' : path}`;
  const response = target.pathname === path ? NextResponse.next({ request: { headers } }) : NextResponse.rewrite(target, { request: { headers } });
  response.headers.set('Content-Language', locale);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  return response;
}
export const config = { matcher: ['/((?!api|_next|og|.*\\..*).*)'] };
