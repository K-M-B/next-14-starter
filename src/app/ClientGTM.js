"use client"
import { useEffect } from "react"

export function ClientGTM() {
  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .reduce((acc, c) => {
        const [key, val] = c.split("=")
        acc[key] = val
        return acc
      }, {})

    const subdomain = cookies["subdomain"] || "default"

    const gtmId =
      subdomain === "careers"
        ? "GTM-XXXXXXX"
        : subdomain === "give"
          ? "GTM-ZZZZZZZ"
          : "GTM-YYYYYYY"

    // Directly inject GTM script dynamically
    if (!document.getElementById("gtm-script")) {
      const script = document.createElement("script")
      script.id = "gtm-script"
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `
      document.head.appendChild(script)
    }
  }, [])

  return null
}
