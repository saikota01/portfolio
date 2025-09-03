import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Saikota.in - Full Stack Developer Portfolio",
  description: "Portfolio of a Full Stack Developer with DevOps expertise",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} overflow-x-hidden`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Disable scroll restoration immediately
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              // Reset scroll position on page load
              window.addEventListener('beforeunload', function() {
                window.scrollTo(0, 0);
              });
            `,
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  )
}
