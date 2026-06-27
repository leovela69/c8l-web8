'use client'

import { useState } from 'react'
import Link from 'next/link'

const TEMPLATE_CATEGORIES = ['Todo', 'Redes Sociales', 'Presentaciones', 'Marketing', 'Logos', 'Posters', 'Invitaciones']

const TEMPLATES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Plantilla ${i + 1}`,
  category: TEMPLATE_CATEGORIES[Math.floor(Math.random() * TEMPLATE_CATEGORIES.length)],
  width: [1080, 1920, 1200, 500][i % 4],
  height: [1080, 1080, 630, 500][i % 4],
  gradient: [
    'from-violet-800 to-purple-900',
    'from-pink-800 to-rose-900',
    'from-blue-800 to-indigo-900',
    'from-amber-800 to-orange-900',
    'from-emerald-800 to-green-900',
  ][i % 5],
  badge: i % 3 === 0 ? 'Pro' : 'Gratis',
}))

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const [search, setSearch] = useState('')

  const filtered = TEMPLATES.filter(t =>
    (activeCategory === 'Todo' || t.category === activeCategory) &&
    (!search || t.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="h-16 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-6 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <span className="text-white font-black text-sm">C8L</span>
          </div>
          <span className="text-lg font-bold text-white">Studio</span>
        </Link>

        <div className="flex-1 max-w-xl">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Buscar plantillas..."
            className="w-full bg-[#252525] border border-[#2a2a2a] rounded-lg pl-4 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500/50 transition"
          />
        </div>

        <div className="ml-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">← Volver</Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Todas las plantillas</h1>

          {/* Categories */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
            {TEMPLATE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(tmpl => (
              <Link
                key={tmpl.id}
                href={`/editor?w=${tmpl.width}&h=${tmpl.height}&template=${tmpl.id}&name=${encodeURIComponent(tmpl.name)}`}
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
                  <p className="text-[11px] text-gray-500 mt-0.5">{tmpl.width}x{tmpl.height} · {tmpl.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
