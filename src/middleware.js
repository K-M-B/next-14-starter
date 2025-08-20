import { NextResponse } from 'next/server'

export function middleware(req) {
  const hostname = req.headers.get('host') || ''
  const subdomainMatch = hostname.match(/^([^.]+)\./)
  const subdomain = subdomainMatch ? subdomainMatch[1] : 'default'

  let pathPrefix = ''

  switch (true) {
    case subdomain.startsWith('careers'):
      pathPrefix = '/careers'
      break
    case subdomain.startsWith('give'):
      pathPrefix = '/give'
      break
    default:
      pathPrefix = ''
      break
  }

  // Rewrite URL if needed
  const response =
    pathPrefix && pathPrefix !== ''
      ? NextResponse.rewrite(new URL(`${pathPrefix}${req.nextUrl.pathname}`, req.url))
      : NextResponse.next()

  // Set only the subdomain cookie for client-side GTM
  response.cookies.set({
    name: 'subdomain',
    value:
      subdomain.startsWith('careers')
        ? 'careers'
        : subdomain.startsWith('give')
          ? 'give'
          : 'default',
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: '.domain.local', // adjust to your domain
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/|.*\\..*).*)'],
}
