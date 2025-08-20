import { NextResponse } from 'next/server';

export function middleware(req) {
  const hostname = req.headers.get('host')!;
  const subdomain = hostname.match(/^([^.]+)\./)?.[1];
  const requestHeaders = new Headers(req.headers);
  let response;

  switch (true) {
    case subdomain.startsWith('careers'):
      requestHeaders.set('x-subdomain', 'careers');
      response = NextResponse.rewrite(new URL(`/careers${req.nextUrl.pathname}`, req.url), { request: { headers: requestHeaders } });
    case subdomain.startsWith('give'):
      response = NextResponse.rewrite(new URL(`/give${req.nextUrl.pathname}`, req.url), { request: { headers: requestHeaders } });
    // Add more cases for other subdomains
    default:
      // Handle the main domain
      requestHeaders.set('x-subdomain', 'default');
      response = NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Instruct Next/Vercel caching to separate by domain
  response.headers.set('Vary', 'x-subdomain');

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'], // ignore _next and assets
};