'use client'

import Link from 'next/link'
import { DesignState } from '@/app/editor/page'

interface ToolbarProps {
  design: DesignState
  setDesign: (fn: (prev: DesignState) => DesignState) => void
  undo: () => void
  redo: () => void
  activeTool: string
  setActiveTool: (tool: string) => void
}

export default function Toolbar({ design, setDesign, undo, redo, activeTool, setActiveTool }: ToolbarProps) {
  const zoomIn = () => setDesign(prev => ({ ...prev, zoom: Math.min(prev.zoom + 0.1, 3) }))
  const zoomOut = () => setDesign(prev => ({ ...prev, zoom: Math.max(prev.zoom - 0.1, 0.1) }))
  const zoomFit = () => setDesign(prev => ({ ...prev, zoom: 0.5 }))

  return (
    <header className="h-14 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-4 gap-3 flex-shrink-0 z-50">
      {/* Logo / Back */}
      <Link href="/" className="flex items-center gap-2 mr-4 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center group-hover:scale-105 transition">
          <span className="text-white font-black text-[10px]">C8L</span>
        </div>
      </Link>

      {/* File name */}
      <input
        value={design.name}
        onChange={(e) => setDesign(prev => ({ ...prev, name: e.target.value }))}
        className="bg-transparent text-sm font-medium text-white outline-none border-b border-transparent hover:border-gray-600 focus:border-violet-500 transition px-1 py-0.5 max-w-[200px]"
      />

      {/* Separator */}
      <div className="w-px h-6 bg-[#2a2a2a] mx-2" />

      {/* Undo / Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={design.historyIndex <= 0}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition disabled:opacity-30 disabled:cursor-not-allowed"
          title="Deshacer (Ctrl+Z)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4" /></svg>
        </button>
        <button
          onClick={redo}
          disabled={design.historyIndex >= design.history.length - 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition disabled:opacity-30 disabled:cursor-not-allowed"
          title="Rehacer (Ctrl+Shift+Z)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2M21 10l-4-4M21 10l-4 4" /></svg>
        </button>
      </div>

      <div className="w-px h-6 bg-[#2a2a2a] mx-2" />

      {/* Zoom controls */}
      <div className="flex items-center gap-1">
        <button onClick={zoomOut} className="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition text-sm">−</button>
        <button onClick={zoomFit} className="px-2 py-1 rounded text-xs text-gray-300 hover:text-white hover:bg-[#252525] transition font-mono">
          {Math.round(design.zoom * 100)}%
        </button>
        <button onClick={zoomIn} className="w-7 h-7 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition text-sm">+</button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition rounded-lg hover:bg-[#252525]">
          Compartir
        </button>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Descargar
        </button>
      </div>
    </header>
  )
}
