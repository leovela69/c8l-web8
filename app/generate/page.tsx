'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// ============ NICHE CONFIG ============
const NICHE_CONFIG: Record<string, { title: string; icon: string; placeholder: string; size: string; width: number; height: number; styles: string[] }> = {
  portada: {
    title: 'Portada de Cancion',
    icon: '🎵',
    placeholder: 'Ej: Portada estilo neon para cancion de reggaeton, con humo dorado y luces de ciudad...',
    size: '3000x3000',
    width: 3000,
    height: 3000,
    styles: ['Neon/Cyberpunk', 'Minimalista', 'Dark/Gothic', 'Tropical', 'Lo-fi/Anime', 'Retro/Vintage', 'Abstract', 'Street/Urban'],
  },
  post: {
    title: 'Post para Redes',
    icon: '📱',
    placeholder: 'Ej: Post promocional para fiesta de verano, colores neon sobre fondo negro, texto grande...',
    size: '1080x1080',
    width: 1080,
    height: 1080,
    styles: ['Neon', 'Clean/Blanco', 'Gradient', 'Foto + Texto', 'Collage', 'Corporate', 'Gaming', 'Aesthetic'],
  },
  poster: {
    title: 'Poster / Flyer',
    icon: '🎭',
    placeholder: 'Ej: Poster para fiesta electronica en club, estilo cyberpunk con ciudad de fondo...',
    size: '1080x1920',
    width: 1080,
    height: 1920,
    styles: ['Club/Fiesta', 'Concierto', 'Festival', 'Corporativo', 'Cine', 'Deportivo', 'Arte', 'Minimalista'],
  },
  logo: {
    title: 'Logo Rapido',
    icon: '🎨',
    placeholder: 'Ej: Logo minimalista con la letra C en degradado violeta sobre fondo negro, estilo tech...',
    size: '1024x1024',
    width: 1024,
    height: 1024,
    styles: ['Minimalista', 'Gaming/Esports', 'Elegante/Luxury', 'Street/Urban', 'Tech/Startup', 'Vintage', 'Mascota', 'Abstract'],
  },
}

function GenerateContent() {
  const searchParams = useSearchParams()
  const nicheId = searchParams.get('niche') || 'portada'
  const niche = NICHE_CONFIG[nicheId] || NICHE_CONFIG.portada

  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState('')
  const [activeNiche, setActiveNiche] = useState(nicheId)

  const currentNiche = NICHE_CONFIG[activeNiche] || NICHE_CONFIG.portada

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Escribe una descripcion de lo que necesitas')
      return
    }

    setGenerating(true)
    setError('')
    setResults([])

    try {
      // Construir prompt completo
      const fullPrompt = `${currentNiche.title}: ${prompt}${selectedStyle ? `, estilo ${selectedStyle}` : ''}`

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          width: currentNiche.width,
          height: currentNiche.height,
          niche: activeNiche,
          style: selectedStyle,
          num_images: 2,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Error generando imagen')
      }

      setResults(data.images || [])
    } catch (err: any) {
      setError(err.message || 'Error de conexion. Intenta de nuevo.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <span className="text-white font-black text-[10px]">C8L</span>
            </div>
            <span className="text-sm font-bold">Studio</span>
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">← Volver</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* ===== NICHE SELECTOR ===== */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {Object.entries(NICHE_CONFIG).map(([id, config]) => (
            <button
              key={id}
              onClick={() => setActiveNiche(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                activeNiche === id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a] hover:border-violet-500/30'
              }`}
            >
              <span>{config.icon}</span> {config.title}
            </button>
          ))}
        </div>

        {/* ===== GENERATOR FORM ===== */}
        <div className="rounded-2xl border border-[#1a1a1a] bg-[#111] p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{currentNiche.icon}</span>
            <div>
              <h1 className="text-xl font-bold">{currentNiche.title}</h1>
              <p className="text-xs text-gray-500">Tamano: {currentNiche.size}px</p>
            </div>
          </div>

          {/* Prompt input */}
          <div className="mb-5">
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block font-medium">Describe lo que quieres</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={currentNiche.placeholder}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500/50 transition resize-none h-28"
            />
          </div>

          {/* Style selector */}
          <div className="mb-6">
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block font-medium">Estilo (opcional)</label>
            <div className="flex flex-wrap gap-2">
              {currentNiche.styles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(selectedStyle === style ? '' : style)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedStyle === style
                      ? 'bg-violet-600 text-white'
                      : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-violet-500/30 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl text-base font-bold transition hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generando con IA...
              </span>
            ) : (
              '✨ Generar con IA — Gratis'
            )}
          </button>
        </div>

        {/* ===== RESULTS ===== */}
        {results.length > 0 && (
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#111] p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-green-400">✓</span> Resultado generado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((url, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#0a0a0a]">
                  <img
                    src={url}
                    alt={`Generado ${i + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <a
                      href={url}
                      download={`c8l-${activeNiche}-${Date.now()}.png`}
                      target="_blank"
                      className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-bold hover:scale-105 transition"
                    >
                      ⬇️ Descargar
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handleGenerate}
                className="text-sm text-violet-400 hover:text-violet-300 transition font-medium"
              >
                🔄 Generar otra version
              </button>
              <p className="text-[10px] text-gray-600">Click en la imagen para descargar en HD</p>
            </div>
          </div>
        )}

        {/* ===== GENERATING ANIMATION ===== */}
        {generating && (
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#111] p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Generando tu diseno...</h3>
            <p className="text-sm text-gray-500">La IA esta creando tu imagen. Esto tarda unos 15-30 segundos.</p>
            <div className="mt-6 w-48 h-1 bg-[#1a1a1a] rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full animate-[loading_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-400">Cargando...</div>}>
      <GenerateContent />
    </Suspense>
  )
}
