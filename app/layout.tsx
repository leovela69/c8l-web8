import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'C8L Studio — Disena como un profesional',
  description: 'Editor de diseno visual estilo Canva. Crea graficos, presentaciones, posts para redes sociales y mas.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0f0f0f] text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}
