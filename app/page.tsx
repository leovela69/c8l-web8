'use client'

import { useState } from 'react'
import Link from 'next/link'

// ============ NICHOS ============
const NICHES = [
  {
    id: 'portada',
    title: 'Portadas de Canciones',
    description: 'Spotify, SoundCloud, YouTube Music',
    icon: '🎵',
    gradient: 'from-purple-600 to-pink-600',
    sizes: '3000x3000',
    examples: ['Portada afro-house con neon y palmas', 'Cover reggaeton oscuro con humo dorado', 'Portada lo-fi anime lluvia en ciudad'],
  },
  {
    id: 'post',
    title: 'Posts para Redes',
    description: 'Instagram, TikTok, Facebook, X',
    icon: '📱',
    gradient: 'from-orange-500 to-red-600',
    sizes: '1080x1080',
    examples: ['Post promocional fiesta neon', 'Story motivacional con paisaje', 'Thumbnail gaming epico explosiones'],
  },
  {
    id: 'poster',
    title: 'Posters y Flyers',
    description: 'Eventos, fiestas, conciertos',
    icon: '🎭',
    gradient: 'from-cyan-500 to-blue-600',
    sizes: '1080x1920',
    examples: ['Poster fiesta electronica neon city', 'Flyer concierto rap underground', 'Cartel festival verano playa'],
  },
  {
    id: 'logo',
    title: 'Logos Rapidos',
    description: 'Marcas, proyectos, canales',
    icon: '🎨',
    gradient: 'from-emerald-500 to-teal-600',
    sizes: '1024x1024',
    examples: ['Logo minimalista letra M dorada', 'Logo gaming agresivo con leon', 'Logo tienda streetwear urbano'],
  },
]

// ============ STATS ============
const STATS = [
  { value: '100%', label: 'Gratis' },
  { value: '30s', label: 'Tiempo generacion' },
  { value: '0', label: 'Conocimientos necesarios' },
  { value: '∞', label: 'Posibilidades' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ============ HEADER ============ */}
      <header className="border-b border-[#1a1a1a] sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-black text-sm">C8L</span>
            </div>
            <span className="text-lg font-bold">Studio</span>
            <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30 font-medium">IA Gratis</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/editor" className="text-sm text-gray-400 hover:text-white transition">Editor Manual</Link>
            <Link href="/generate" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition">
              Crear con IA
            </Link>
          </nav>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block mb-6">
          <span className="text-sm bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-violet-300 px-4 py-1.5 rounded-full font-medium">
            Generador con Inteligencia Artificial
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          Describe lo que necesitas.<br />
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            La IA lo crea por ti.
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Portadas de canciones, posts para redes, posters, logos. 
          Escribe que quieres en 1 frase y descarga el resultado en 30 segundos. 
          <strong className="text-white">100% gratis.</strong>
        </p>

        {/* Quick CTA */}
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl text-lg font-bold transition hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/25"
        >
          ✨ Empezar a crear gratis
        </Link>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="border-y border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ NICHOS ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Que quieres crear?</h2>
          <p className="text-gray-400">Elige una categoria y describe tu idea. La IA hace el resto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NICHES.map((niche) => (
            <Link
              key={niche.id}
              href={`/generate?niche=${niche.id}`}
              className="group relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#111] hover:border-violet-500/40 transition-all hover:scale-[1.01]"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${niche.gradient}`} />

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-3xl mb-3 block">{niche.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{niche.title}</h3>
                    <p className="text-sm text-gray-500">{niche.description}</p>
                  </div>
                  <span className="text-[10px] text-gray-600 bg-[#1a1a1a] px-2 py-1 rounded">{niche.sizes}</span>
                </div>

                {/* Examples */}
                <div className="space-y-2 mt-6">
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider">Ejemplos de prompts:</p>
                  {niche.examples.map((ex, i) => (
                    <div key={i} className="text-xs text-gray-400 bg-[#0a0a0a] rounded-lg px-3 py-2 border border-[#1a1a1a]">
                      &quot;{ex}&quot;
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-2 text-sm text-violet-400 font-medium group-hover:text-violet-300 transition">
                  <span>Crear con IA</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="border-t border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Elige categoria', desc: 'Portada, post, poster o logo', icon: '🎯' },
              { step: '2', title: 'Describe tu idea', desc: 'Escribe en 1 frase que necesitas', icon: '✍️' },
              { step: '3', title: 'Descarga gratis', desc: 'La IA genera opciones en 30 segundos', icon: '⬇️' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-[10px] text-violet-400 font-bold mb-2 uppercase tracking-wider">Paso {item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EDITOR PROMO ============ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-[#1a1a1a] bg-[#111] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">Tambien: Editor manual</h3>
            <p className="text-gray-400 mb-6">
              Si prefieres disenar a mano, tenemos un editor visual estilo Canva con texto, formas, fotos y mas.
            </p>
            <Link href="/editor" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-violet-500/50 rounded-lg text-sm font-medium transition">
              Abrir editor manual →
            </Link>
          </div>
          <div className="w-48 h-32 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-[#2a2a2a] flex items-center justify-center">
            <span className="text-4xl opacity-30">🖌️</span>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-black text-[8px]">C8L</span>
            </div>
            <span className="text-xs text-gray-500">C8L Studio — Generador IA gratuito. 2026.</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a href="https://gen-lang-client-0744582882.web.app/feed/" target="_blank" className="hover:text-white transition">C8L Agency</a>
            <Link href="/editor" className="hover:text-white transition">Editor</Link>
            <Link href="/templates" className="hover:text-white transition">Plantillas</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
