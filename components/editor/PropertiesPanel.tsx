'use client'

import { DesignElement, DesignState } from '@/app/editor/page'

interface PropertiesPanelProps {
  element: DesignElement | null
  updateElement: (id: string, updates: Partial<DesignElement>) => void
  deleteElement: (id: string) => void
  addElement?: (element: Omit<DesignElement, 'id'>) => void
  design: DesignState
  setDesign: (fn: (prev: DesignState) => DesignState) => void
}

const FONT_FAMILIES = ['Inter', 'Arial', 'Georgia', 'Courier New', 'Times New Roman', 'Verdana', 'Impact']
const COLORS = ['#000000', '#ffffff', '#7c3aed', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#14b8a6']

export default function PropertiesPanel({ element, updateElement, deleteElement, addElement, design, setDesign }: PropertiesPanelProps) {
  if (!element) {
    return (
      <div className="w-[260px] bg-[#1a1a1a] border-l border-[#2a2a2a] p-4 flex-shrink-0 overflow-y-auto">
        <h3 className="text-sm font-bold text-white mb-3">Propiedades</h3>
        <p className="text-xs text-gray-500">Selecciona un elemento para editar sus propiedades</p>

        <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
          <h4 className="text-xs font-medium text-gray-400 mb-2">Canvas</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 w-12">Ancho</span>
              <input
                value={design.width}
                onChange={e => setDesign(prev => ({ ...prev, width: parseInt(e.target.value) || 1080 }))}
                className="flex-1 bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1 text-xs text-white outline-none"
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 w-12">Alto</span>
              <input
                value={design.height}
                onChange={e => setDesign(prev => ({ ...prev, height: parseInt(e.target.value) || 1080 }))}
                className="flex-1 bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1 text-xs text-white outline-none"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[260px] bg-[#1a1a1a] border-l border-[#2a2a2a] p-4 flex-shrink-0 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white capitalize">{element.type}</h3>
        <button
          onClick={() => deleteElement(element.id)}
          className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-300 transition"
          title="Eliminar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      {/* ===== POSITION & SIZE ===== */}
      <section className="mb-4 pb-4 border-b border-[#2a2a2a]">
        <h4 className="text-[10px] text-gray-400 uppercase mb-2 font-medium">Posicion y tamano</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[9px] text-gray-500 block mb-0.5">X</label>
            <input
              value={Math.round(element.x)}
              onChange={e => updateElement(element.id, { x: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
              type="number"
            />
          </div>
          <div>
            <label className="text-[9px] text-gray-500 block mb-0.5">Y</label>
            <input
              value={Math.round(element.y)}
              onChange={e => updateElement(element.id, { y: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
              type="number"
            />
          </div>
          <div>
            <label className="text-[9px] text-gray-500 block mb-0.5">Ancho</label>
            <input
              value={Math.round(element.width)}
              onChange={e => updateElement(element.id, { width: parseFloat(e.target.value) || 20 })}
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
              type="number"
            />
          </div>
          <div>
            <label className="text-[9px] text-gray-500 block mb-0.5">Alto</label>
            <input
              value={Math.round(element.height)}
              onChange={e => updateElement(element.id, { height: parseFloat(e.target.value) || 20 })}
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
              type="number"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="text-[9px] text-gray-500 block mb-0.5">Rotacion</label>
            <input
              value={element.rotation}
              onChange={e => updateElement(element.id, { rotation: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
              type="number"
            />
          </div>
          <div>
            <label className="text-[9px] text-gray-500 block mb-0.5">Opacidad</label>
            <input
              type="range"
              min="0" max="1" step="0.05"
              value={element.opacity}
              onChange={e => updateElement(element.id, { opacity: parseFloat(e.target.value) })}
              className="w-full mt-1"
            />
          </div>
        </div>
      </section>

      {/* ===== TEXT PROPERTIES ===== */}
      {element.type === 'text' && (
        <section className="mb-4 pb-4 border-b border-[#2a2a2a]">
          <h4 className="text-[10px] text-gray-400 uppercase mb-2 font-medium">Texto</h4>

          <textarea
            value={element.content || ''}
            onChange={e => updateElement(element.id, { content: e.target.value })}
            className="w-full bg-[#252525] border border-[#2a2a2a] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-violet-500/50 transition resize-none h-20 mb-3"
          />

          <div className="space-y-2">
            <div>
              <label className="text-[9px] text-gray-500 block mb-0.5">Fuente</label>
              <select
                value={element.fontFamily}
                onChange={e => updateElement(element.id, { fontFamily: e.target.value })}
                className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none"
              >
                {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[9px] text-gray-500 block mb-0.5">Tamano</label>
                <input
                  value={element.fontSize}
                  onChange={e => updateElement(element.id, { fontSize: parseInt(e.target.value) || 16 })}
                  className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none"
                  type="number"
                />
              </div>
              <div className="flex-1">
                <label className="text-[9px] text-gray-500 block mb-0.5">Peso</label>
                <select
                  value={element.fontWeight}
                  onChange={e => updateElement(element.id, { fontWeight: e.target.value })}
                  className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none"
                >
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semibold</option>
                  <option value="700">Bold</option>
                  <option value="800">Extra Bold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] text-gray-500 block mb-0.5">Alineacion</label>
              <div className="flex gap-1">
                {['left', 'center', 'right'].map(align => (
                  <button
                    key={align}
                    onClick={() => updateElement(element.id, { textAlign: align })}
                    className={`flex-1 py-1.5 rounded text-xs transition ${
                      element.textAlign === align ? 'bg-violet-600 text-white' : 'bg-[#252525] text-gray-400 hover:text-white'
                    }`}
                  >
                    {align === 'left' ? '◀' : align === 'center' ? '◆' : '▶'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[9px] text-gray-500 block mb-1">Color del texto</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={element.color || '#000000'}
                  onChange={e => updateElement(element.id, { color: e.target.value })}
                  className="w-8 h-8 rounded border border-[#2a2a2a] cursor-pointer"
                />
                <div className="flex flex-wrap gap-1">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => updateElement(element.id, { color })}
                      className={`w-5 h-5 rounded border transition hover:scale-110 ${
                        element.color === color ? 'border-violet-500 ring-1 ring-violet-500/50' : 'border-[#2a2a2a]'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== SHAPE PROPERTIES ===== */}
      {element.type === 'shape' && (
        <section className="mb-4 pb-4 border-b border-[#2a2a2a]">
          <h4 className="text-[10px] text-gray-400 uppercase mb-2 font-medium">Forma</h4>

          <div className="space-y-2">
            <div>
              <label className="text-[9px] text-gray-500 block mb-1">Color de relleno</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={element.fill || '#7c3aed'}
                  onChange={e => updateElement(element.id, { fill: e.target.value })}
                  className="w-8 h-8 rounded border border-[#2a2a2a] cursor-pointer"
                />
                <div className="flex flex-wrap gap-1">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => updateElement(element.id, { fill: color })}
                      className={`w-5 h-5 rounded border transition hover:scale-110 ${
                        element.fill === color ? 'border-violet-500 ring-1 ring-violet-500/50' : 'border-[#2a2a2a]'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[9px] text-gray-500 block mb-1">Borde</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={element.stroke || '#000000'}
                  onChange={e => updateElement(element.id, { stroke: e.target.value })}
                  className="w-8 h-8 rounded border border-[#2a2a2a] cursor-pointer"
                />
                <input
                  value={element.strokeWidth || 0}
                  onChange={e => updateElement(element.id, { strokeWidth: parseInt(e.target.value) || 0 })}
                  className="w-16 bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none"
                  type="number"
                  placeholder="px"
                />
              </div>
            </div>

            {element.shapeType === 'rect' && (
              <div>
                <label className="text-[9px] text-gray-500 block mb-0.5">Radio de borde</label>
                <input
                  value={element.borderRadius || 0}
                  onChange={e => updateElement(element.id, { borderRadius: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none"
                  type="number"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== IMAGE PROPERTIES ===== */}
      {element.type === 'image' && (
        <section className="mb-4 pb-4 border-b border-[#2a2a2a]">
          <h4 className="text-[10px] text-gray-400 uppercase mb-2 font-medium">Imagen</h4>
          <div className="space-y-2">
            <div>
              <label className="text-[9px] text-gray-500 block mb-0.5">Ajuste</label>
              <select
                value={element.objectFit || 'cover'}
                onChange={e => updateElement(element.id, { objectFit: e.target.value })}
                className="w-full bg-[#252525] border border-[#2a2a2a] rounded px-2 py-1.5 text-xs text-white outline-none"
              >
                <option value="cover">Cubrir</option>
                <option value="contain">Contener</option>
                <option value="fill">Estirar</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {/* ===== ACTIONS ===== */}
      <section>
        <h4 className="text-[10px] text-gray-400 uppercase mb-2 font-medium">Acciones</h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateElement(element.id, { x: (design.width - element.width) / 2 })}
            className="px-2.5 py-1.5 bg-[#252525] border border-[#2a2a2a] rounded text-[10px] text-gray-300 hover:text-white hover:border-violet-500/50 transition"
          >
            Centrar H
          </button>
          <button
            onClick={() => updateElement(element.id, { y: (design.height - element.height) / 2 })}
            className="px-2.5 py-1.5 bg-[#252525] border border-[#2a2a2a] rounded text-[10px] text-gray-300 hover:text-white hover:border-violet-500/50 transition"
          >
            Centrar V
          </button>
          <button
            onClick={() => {
              if (!addElement) return
              const el = { ...element, id: '', x: element.x + 20, y: element.y + 20 }
              const { id, ...rest } = el
              addElement(rest as any)
            }}
            className="px-2.5 py-1.5 bg-[#252525] border border-[#2a2a2a] rounded text-[10px] text-gray-300 hover:text-white hover:border-violet-500/50 transition"
          >
            Duplicar
          </button>
          <button
            onClick={() => deleteElement(element.id)}
            className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded text-[10px] text-red-400 hover:text-red-300 hover:bg-red-500/20 transition"
          >
            Eliminar
          </button>
        </div>
      </section>
    </div>
  )
}
