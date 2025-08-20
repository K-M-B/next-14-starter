import { NextResponse } from 'next/server';

export function middleware(req) {
  const hostname = req.headers.get('host')!;
  const subdomain = hostname.match(/^([^.]+)\./)?.[1];

  switch (true) {
    case subdomain.startsWith('careers'):
      return NextResponse.rewrite(new URL(`/careers${req.nextUrl.pathname}`, req.url));
    case subdomain.startsWith('give'):
      return NextResponse.rewrite(new URL(`/give${req.nextUrl.pathname}`, req.url));
    // Add more cases for other subdomains
    default:
    // Handle the main domain
  }


  return NextResponse.next();
}