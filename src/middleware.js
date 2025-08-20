// middleware.js
import { NextResponse } from 'next/server'

export function middleware(req) {
  console.log('Middleware HIT:', req.url)

  const hostname = req.headers.get('host') || ''
  console.log('Host:', hostname);
  const subdomainMatch = hostname.match(/^([^.]+)\./)
  const subdomain = subdomainMatch ? subdomainMatch[1] : 'default'
  console.log('subdomain', subdomain);

  let response

  switch (true) {
    case subdomain.startsWith('careers'):
      response = NextResponse.rewrite(new URL(`/careers${req.nextUrl.pathname}`, req.url))
      response.cookies.set({
        name: 'subdomain',
        value: 'careers',
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain: '.domain.local',
      })
      break

    case subdomain.startsWith('give'):
      response = NextResponse.rewrite(new URL(`/give${req.nextUrl.pathname}`, req.url))
      response.cookies.set({
        name: 'subdomain',
        value: 'give',
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain: '.domain.local',
      })
      break

    default:
      response = NextResponse.next()
      response.cookies.set({
        name: 'subdomain',
        value: 'default',
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        domain: '.domain.local',
      })
      break
  }

  response.headers.set('Vary', 'Cookie')
  console.log('response', response);
  return response
}

export const config = {
  matcher: ['/((?!_next/|.*\\..*).*)'],
}
