'use client'

import { useState } from 'react'
import Link from 'next/link'

// ============ TEMPLATE CATEGORIES ============
const CATEGORIES = [
  { id: 'all', label: 'Todo', icon: '✨' },
  { id: 'social', label: 'Redes Sociales', icon: '📱' },
  { id: 'presentation', label: 'Presentaciones', icon: '📊' },
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'print', label: 'Imprimir', icon: '🖨️' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'logo', label: 'Logos', icon: '🎨' },
]

// ============ TEMPLATE SIZES ============
const QUICK_SIZES = [
  { label: 'Post Instagram', width: 1080, height: 1080, icon: '📷', color: 'from-pink-500 to-purple-600' },
  { label: 'Story', width: 1080, height: 1920, icon: '📱', color: 'from-orange-500 to-pink-500' },
  { label: 'Post Facebook', width: 1200, height: 630, icon: '👍', color: 'from-blue-500 to-blue-700' },
  { label: 'Banner YouTube', width: 2560, height: 1440, icon: '▶️', color: 'from-red-500 to-red-700' },
  { label: 'Presentacion', width: 1920, height: 1080, icon: '📊', color: 'from-amber-500 to-orange-600' },
  { label: 'A4 Documento', width: 2480, height: 3508, icon: '📄', color: 'from-green-500 to-teal-600' },
  { label: 'Logo', width: 500, height: 500, icon: '🎨', color: 'from-violet-500 to-purple-700' },
  { label: 'Tarjeta Visita', width: 1050, height: 600, icon: '💼', color: 'from-slate-500 to-gray-700' },
]

// ============ RECENT PROJECTS (mock) ============
const RECENT_PROJECTS = [
  { id: '1', name: 'Post Promo C8L', size: '1080x1080', modified: 'Hace 2h', thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: '2', name: 'Story Evento', size: '1080x1920', modified: 'Ayer', thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: '3', name: 'Banner YouTube', size: '2560x1440', modified: 'Hace 3 dias', thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: '4', name: 'Logo Nuevo', size: '500x500', modified: 'Hace 1 semana', thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showCustomSize, setShowCustomSize] = useState(false)
  const [customWidth, setCustomWidth] = useState('1080')
  const [customHeight, setCustomHeight] = useState('1080')

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* ============ TOP BAR ============ */}
      <header className="h-16 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <span className="text-white font-black text-sm">C8L</span>
          </div>
          <span className="text-lg font-bold text-white">Studio</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar plantillas, elementos, fotos..."
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500/50 transition"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition">
            + Crear diseno
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">L</span>
          </div>
        </div>
      </header>

      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">

          {/* ===== HERO: Que quieres disenar? ===== */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-white mb-2">Que quieres disenar hoy?</h1>
            <p className="text-gray-400 text-sm mb-8">Elige un tamano o empieza desde una plantilla</p>

            {/* Quick size cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {QUICK_SIZES.map((size) => (
                <Link
                  key={size.label}
                  href={`/editor?w=${size.width}&h=${size.height}&name=${encodeURIComponent(size.label)}`}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-violet-500/50 hover:bg-[#1f1f2f] transition cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${size.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {size.icon}
                  </div>
                  <span className="text-[11px] text-gray-300 font-medium text-center leading-tight">{size.label}</span>
                  <span className="text-[9px] text-gray-600">{size.width}x{size.height}</span>
                </Link>
              ))}
            </div>

            {/* Custom size */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setShowCustomSize(!showCustomSize)}
                className="text-sm text-violet-400 hover:text-violet-300 transition font-medium"
              >
                + Tamano personalizado
              </button>
              {showCustomSize && (
                <div className="flex items-center gap-2 animate-in fade-in">
                  <input
                    value={customWidth}
                    onChange={e => setCustomWidth(e.target.value)}
                    className="w-20 bg-[#252525] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500/50"
                    placeholder="Ancho"
                  />
                  <span className="text-gray-500 text-sm">x</span>
                  <input
                    value={customHeight}
                    onChange={e => setCustomHeight(e.target.value)}
                    className="w-20 bg-[#252525] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500/50"
                    placeholder="Alto"
                  />
                  <span className="text-[10px] text-gray-500">px</span>
                  <Link
                    href={`/editor?w=${customWidth}&h=${customHeight}&name=Diseno+personalizado`}
                    className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-medium transition"
                  >
                    Crear
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* ===== RECENT PROJECTS ===== */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Proyectos recientes</h2>
              <button className="text-sm text-gray-400 hover:text-white transition">Ver todos →</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {RECENT_PROJECTS.map((project) => (
                <Link
                  key={project.id}
                  href={`/editor?project=${project.id}`}
                  className="group rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] hover:border-violet-500/40 transition cursor-pointer"
                >
                  <div
                    className="aspect-[4/3] w-full group-hover:scale-[1.02] transition-transform duration-300"
                    style={{ background: project.thumbnail }}
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-white truncate">{project.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{project.size} · {project.modified}</p>
                  </div>
                </Link>
              ))}

              {/* New project card */}
              <Link
                href="/editor?w=1080&h=1080&name=Nuevo+diseno"
                className="group rounded-xl overflow-hidden bg-[#1a1a1a] border-2 border-dashed border-[#2a2a2a] hover:border-violet-500/50 transition cursor-pointer flex flex-col items-center justify-center aspect-[4/3] p-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#252525] group-hover:bg-violet-500/20 flex items-center justify-center transition mb-2">
                  <span className="text-2xl text-gray-400 group-hover:text-violet-400 transition">+</span>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition">Nuevo diseno</span>
              </Link>
            </div>
          </section>

          {/* ===== TEMPLATES ===== */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Plantillas populares</h2>
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? 'bg-violet-600 text-white'
                      : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#252525] border border-[#2a2a2a]'
                  }`}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>

            {/* Templates grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[
                { name: 'Post Minimalista', gradient: 'from-slate-800 to-slate-900', badge: 'Gratis' },
                { name: 'Story Neon', gradient: 'from-purple-900 to-pink-900', badge: 'Gratis' },
                { name: 'Flyer Evento', gradient: 'from-amber-900 to-red-900', badge: 'Pro' },
                { name: 'Logo Moderno', gradient: 'from-cyan-900 to-blue-900', badge: 'Gratis' },
                { name: 'Presentacion Dark', gradient: 'from-gray-800 to-gray-900', badge: 'Gratis' },
                { name: 'Banner Sale', gradient: 'from-red-900 to-orange-900', badge: 'Pro' },
                { name: 'Tarjeta Personal', gradient: 'from-emerald-900 to-green-900', badge: 'Gratis' },
                { name: 'Post Corporativo', gradient: 'from-blue-900 to-indigo-900', badge: 'Gratis' },
                { name: 'Story Gradient', gradient: 'from-violet-900 to-fuchsia-900', badge: 'Gratis' },
                { name: 'Poster Musical', gradient: 'from-rose-900 to-pink-900', badge: 'Pro' },
              ].map((tmpl, i) => (
                <Link
                  key={i}
                  href={`/editor?template=${i}&name=${encodeURIComponent(tmpl.name)}`}
                  className="group rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] hover:border-violet-500/40 transition cursor-pointer"
                >
                  <div className={`aspect-[4/3] w-full bg-gradient-to-br ${tmpl.gradient} flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300 relative`}>
                    <span className="text-4xl opacity-30 group-hover:opacity-50 transition">🎨</span>
                    <span className={`absolute top-2 right-2 text-[9px] px-2 py-0.5 rounded-full font-medium ${
                      tmpl.badge === 'Pro' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'
                    }`}>
                      {tmpl.badge}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-white truncate">{tmpl.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">1080x1080</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Spacer for scroll */}
          <div className="h-12" />
        </div>
      </main>
    </div>
  )
}
