import { ClientGTM } from "./ClientGTM"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Client-side GTM injection */}
        <ClientGTM />
      </body>
    </html>
  )
}
