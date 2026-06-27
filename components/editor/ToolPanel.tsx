'use client'

import { useState } from 'react'
import { DesignElement, DesignState } from '@/app/editor/page'

interface ToolPanelProps {
  activePanel: string
  setActivePanel: (panel: string) => void
  addElement: (element: Omit<DesignElement, 'id'>) => void
  design: DesignState
  setDesign: (fn: (prev: DesignState) => DesignState) => void
}

// ============ PANEL TABS ============
const TABS = [
  { id: 'templates', icon: '📐', label: 'Plantillas' },
  { id: 'text', icon: '𝐓', label: 'Texto' },
  { id: 'elements', icon: '◆', label: 'Elementos' },
  { id: 'uploads', icon: '📁', label: 'Subidas' },
  { id: 'photos', icon: '📷', label: 'Fotos' },
  { id: 'ai', icon: '✨', label: 'IA' },
  { id: 'backgrounds', icon: '🎨', label: 'Fondos' },
]

// ============ SHAPES ============
const SHAPES = [
  { type: 'rect' as const, label: 'Rectangulo', icon: '⬜', fill: '#7c3aed' },
  { type: 'circle' as const, label: 'Circulo', icon: '⬤', fill: '#ec4899' },
  { type: 'triangle' as const, label: 'Triangulo', icon: '△', fill: '#f59e0b' },
  { type: 'rect' as const, label: 'Cuadrado redondeado', icon: '▢', fill: '#10b981', borderRadius: 20 },
  { type: 'line' as const, label: 'Linea', icon: '—', fill: '#6366f1' },
]

// ============ TEXT PRESETS ============
const TEXT_PRESETS = [
  { label: 'Titulo grande', fontSize: 64, fontWeight: '800', content: 'Titulo' },
  { label: 'Subtitulo', fontSize: 36, fontWeight: '600', content: 'Subtitulo' },
  { label: 'Texto normal', fontSize: 20, fontWeight: '400', content: 'Escribe tu texto aqui' },
  { label: 'Texto pequeno', fontSize: 14, fontWeight: '400', content: 'Texto pequeno' },
]

// ============ BG COLORS ============
const BG_COLORS = [
  '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#adb5bd',
  '#000000', '#1a1a1a', '#212529', '#343a40', '#495057',
  '#7c3aed', '#6d28d9', '#4c1d95', '#ec4899', '#db2777',
  '#ef4444', '#dc2626', '#f59e0b', '#d97706', '#10b981',
  '#059669', '#3b82f6', '#2563eb', '#1d4ed8', '#6366f1',
]

// ============ GRADIENTS ============
const BG_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
]

export default function ToolPanel({ activePanel, setActivePanel, addElement, design, setDesign }: ToolPanelProps) {

  const handleAddText = (preset: typeof TEXT_PRESETS[0]) => {
    addElement({
      type: 'text',
      x: design.width / 2 - 150,
      y: design.height / 2 - 30,
      width: 300,
      height: preset.fontSize * 1.5,
      rotation: 0,
      opacity: 1,
      content: preset.content,
      fontSize: preset.fontSize,
      fontWeight: preset.fontWeight,
      fontFamily: 'Inter',
      textAlign: 'center',
      color: '#000000',
    })
  }

  const handleAddShape = (shape: typeof SHAPES[0]) => {
    addElement({
      type: 'shape',
      x: design.width / 2 - 75,
      y: design.height / 2 - 75,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      shapeType: shape.type,
      fill: shape.fill,
      stroke: 'transparent',
      strokeWidth: 0,
      borderRadius: shape.borderRadius || 0,
    })
  }

  const handleBgColor = (color: string) => {
    setDesign(prev => ({ ...prev, backgroundColor: color }))
  }

  return (
    <div className="flex h-full flex-shrink-0">
      {/* Icon sidebar */}
      <div className="w-[72px] bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col items-center py-3 gap-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition text-[10px] font-medium ${
              activePanel === tab.id
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                : 'text-gray-400 hover:text-white hover:bg-[#252525]'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="leading-none">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Expanded panel */}
      <div className="w-[280px] bg-[#1a1a1a] border-r border-[#2a2a2a] overflow-y-auto p-4">

        {/* ===== TEMPLATES ===== */}
        {activePanel === 'templates' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Plantillas</h3>
            <input
              type="text"
              placeholder="Buscar plantillas..."
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-500/50 transition mb-4"
            />
            <div className="grid grid-cols-2 gap-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-[#2a2a2a] hover:border-violet-500/50 transition cursor-pointer flex items-center justify-center"
                >
                  <span className="text-2xl opacity-30">🎨</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TEXT ===== */}
        {activePanel === 'text' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Texto</h3>
            <div className="space-y-2">
              {TEXT_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleAddText(preset)}
                  className="w-full text-left p-3 rounded-xl bg-[#252525] border border-[#2a2a2a] hover:border-violet-500/50 hover:bg-[#2a2a3a] transition"
                >
                  <span
                    className="text-white block"
                    style={{ fontSize: `${Math.min(preset.fontSize / 3, 22)}px`, fontWeight: preset.fontWeight as any }}
                  >
                    {preset.label}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-1 block">{preset.fontSize}px · {preset.fontWeight}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <h4 className="text-xs font-medium text-gray-400 mb-2">Combinaciones de fuentes</h4>
              <div className="space-y-2">
                {['Inter + Georgia', 'Montserrat + Open Sans', 'Playfair + Lato'].map((combo, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-2.5 rounded-lg bg-[#252525] border border-[#2a2a2a] hover:border-violet-500/50 transition"
                  >
                    <span className="text-xs text-white">{combo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ELEMENTS ===== */}
        {activePanel === 'elements' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Elementos</h3>

            <h4 className="text-xs font-medium text-gray-400 mb-2">Formas basicas</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {SHAPES.map((shape, i) => (
                <button
                  key={i}
                  onClick={() => handleAddShape(shape)}
                  className="aspect-square rounded-xl bg-[#252525] border border-[#2a2a2a] hover:border-violet-500/50 hover:bg-[#2a2a3a] transition flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-2xl" style={{ color: shape.fill }}>{shape.icon}</span>
                  <span className="text-[9px] text-gray-500">{shape.label}</span>
                </button>
              ))}
            </div>

            <h4 className="text-xs font-medium text-gray-400 mb-2">Lineas y flechas</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['━', '┄', '→', '↔', '⤴', '↗'].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => handleAddShape({ type: 'line', label: 'Linea', icon, fill: '#6366f1' })}
                  className="aspect-square rounded-xl bg-[#252525] border border-[#2a2a2a] hover:border-violet-500/50 transition flex items-center justify-center text-xl text-gray-300"
                >
                  {icon}
                </button>
              ))}
            </div>

            <h4 className="text-xs font-medium text-gray-400 mb-2">Iconos</h4>
            <div className="grid grid-cols-5 gap-1.5">
              {['⭐', '❤️', '🔥', '💎', '⚡', '🎵', '📍', '✅', '❌', '💬', '👍', '🎯', '🏆', '📌', '🔔'].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => addElement({
                    type: 'text', x: design.width/2 - 25, y: design.height/2 - 25,
                    width: 50, height: 50, rotation: 0, opacity: 1,
                    content: icon, fontSize: 40, fontWeight: '400', fontFamily: 'sans-serif', textAlign: 'center', color: '#000'
                  })}
                  className="aspect-square rounded-lg bg-[#252525] border border-[#2a2a2a] hover:border-violet-500/50 transition flex items-center justify-center text-lg hover:scale-110"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===== UPLOADS ===== */}
        {activePanel === 'uploads' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Tus archivos</h3>
            <button className="w-full py-8 rounded-xl border-2 border-dashed border-[#3a3a3a] hover:border-violet-500/50 transition flex flex-col items-center justify-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-[#252525] group-hover:bg-violet-500/20 flex items-center justify-center transition">
                <span className="text-xl text-gray-400 group-hover:text-violet-400">↑</span>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-white transition">Subir archivo</span>
              <span className="text-[10px] text-gray-600">PNG, JPG, SVG, MP4</span>
            </button>

            <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
              <p className="text-xs text-gray-500 text-center">Tus archivos subidos apareceran aqui</p>
            </div>
          </div>
        )}

        {/* ===== PHOTOS ===== */}
        {activePanel === 'photos' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Fotos gratuitas</h3>
            <input
              type="text"
              placeholder="Buscar fotos..."
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-500/50 transition mb-3"
            />
            <div className="grid grid-cols-2 gap-2">
              {[
                'photo-1507003211169-0a1dd7228f2d',
                'photo-1493225457124-a3eb161ffa5f',
                'photo-1519125323398-675f0ddb6308',
                'photo-1506905925346-21bda4d32df4',
                'photo-1470071459604-3b5ec3a7fe05',
                'photo-1441974231531-c6227db76b6e',
              ].map((photoId, i) => (
                <button
                  key={i}
                  onClick={() => addElement({
                    type: 'image',
                    x: design.width/2 - 150, y: design.height/2 - 100,
                    width: 300, height: 200, rotation: 0, opacity: 1,
                    src: `https://images.unsplash.com/${photoId}?w=600&h=400&fit=crop`,
                    objectFit: 'cover',
                  })}
                  className="aspect-[3/2] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-violet-500/50 transition cursor-pointer group"
                >
                  <img
                    src={`https://images.unsplash.com/${photoId}?w=300&h=200&fit=crop`}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===== AI ===== */}
        {activePanel === 'ai' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Generador IA</h3>
            <p className="text-[11px] text-gray-500 mb-4">Crea imagenes, textos y disenos con inteligencia artificial</p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 uppercase mb-1 block">Describe lo que quieres</label>
                <textarea
                  placeholder="Ej: Un logo moderno minimalista con la letra C en gradiente violeta..."
                  className="w-full bg-[#252525] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-500/50 transition resize-none h-24"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase mb-1 block">Estilo</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Realista', 'Ilustracion', 'Minimalista', 'Abstracto', '3D', 'Flat Design'].map(style => (
                    <button key={style} className="px-2 py-1.5 rounded-lg bg-[#252525] border border-[#2a2a2a] text-[10px] text-gray-300 hover:border-violet-500/50 hover:text-white transition">
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl text-sm font-medium text-white transition">
                ✨ Generar con IA
              </button>
            </div>
          </div>
        )}

        {/* ===== BACKGROUNDS ===== */}
        {activePanel === 'backgrounds' && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Fondo del canvas</h3>

            <h4 className="text-xs font-medium text-gray-400 mb-2">Colores solidos</h4>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {BG_COLORS.map((color, i) => (
                <button
                  key={i}
                  onClick={() => handleBgColor(color)}
                  className={`w-full aspect-square rounded-lg border-2 transition hover:scale-110 ${
                    design.backgroundColor === color ? 'border-violet-500 ring-2 ring-violet-500/30' : 'border-[#2a2a2a]'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <h4 className="text-xs font-medium text-gray-400 mb-2">Gradientes</h4>
            <div className="grid grid-cols-2 gap-2">
              {BG_GRADIENTS.map((gradient, i) => (
                <button
                  key={i}
                  onClick={() => handleBgColor(gradient)}
                  className="aspect-[3/2] rounded-lg border-2 border-[#2a2a2a] hover:border-violet-500/50 transition hover:scale-105"
                  style={{ background: gradient }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
