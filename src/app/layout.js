import { GoogleTagManager } from '@next/third-parties/google'
import { cookies } from 'next/headers'

export default function RootLayout({ children }) {
  console.log('re-rendering layout')
  const subdomain = cookies().get('subdomain')?.value || 'default'

  const gtmId =
    subdomain === 'careers'
      ? 'GTM-XXXXXXX'
      : subdomain === 'give'
        ? 'GTM-ZZZZZZZ'
        : 'GTM-YYYYYYY'

  return (
    <html lang="en">
      <body>
        {children}
        <GoogleTagManager gtmId={gtmId} />
      </body>
    </html>
  )
}
