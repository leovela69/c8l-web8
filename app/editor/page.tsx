'use client'

import { useState, useRef, useCallback, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ToolPanel from '@/components/editor/ToolPanel'
import Canvas from '@/components/editor/Canvas'
import PropertiesPanel from '@/components/editor/PropertiesPanel'
import Toolbar from '@/components/editor/Toolbar'

// ============ TYPES ============
export interface DesignElement {
  id: string
  type: 'text' | 'shape' | 'image' | 'svg'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  // Text
  content?: string
  fontSize?: number
  fontWeight?: string
  fontFamily?: string
  textAlign?: string
  color?: string
  // Shape
  shapeType?: 'rect' | 'circle' | 'triangle' | 'line'
  fill?: string
  stroke?: string
  strokeWidth?: number
  borderRadius?: number
  // Image
  src?: string
  objectFit?: string
}

export interface DesignState {
  name: string
  width: number
  height: number
  backgroundColor: string
  elements: DesignElement[]
  selectedId: string | null
  zoom: number
  history: DesignElement[][]
  historyIndex: number
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0f0f0f] flex items-center justify-center"><span className="text-gray-400">Cargando editor...</span></div>}>
      <EditorContent />
    </Suspense>
  )
}

function EditorContent() {
  const searchParams = useSearchParams()
  const canvasWidth = parseInt(searchParams.get('w') || '1080')
  const canvasHeight = parseInt(searchParams.get('h') || '1080')
  const projectName = searchParams.get('name') || 'Diseno sin titulo'

  const [design, setDesign] = useState<DesignState>({
    name: projectName,
    width: canvasWidth,
    height: canvasHeight,
    backgroundColor: '#ffffff',
    elements: [],
    selectedId: null,
    zoom: 0.5,
    history: [[]],
    historyIndex: 0,
  })

  const [activeTool, setActiveTool] = useState<string>('select')
  const [activePanel, setActivePanel] = useState<string>('templates')

  // ============ ELEMENT ACTIONS ============
  const addElement = useCallback((element: Omit<DesignElement, 'id'>) => {
    const id = `el_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const newElement = { ...element, id }
    setDesign(prev => {
      const newElements = [...prev.elements, newElement]
      const newHistory = [...prev.history.slice(0, prev.historyIndex + 1), newElements]
      return {
        ...prev,
        elements: newElements,
        selectedId: id,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  }, [])

  const updateElement = useCallback((id: string, updates: Partial<DesignElement>) => {
    setDesign(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, ...updates } : el),
    }))
  }, [])

  const deleteElement = useCallback((id: string) => {
    setDesign(prev => {
      const newElements = prev.elements.filter(el => el.id !== id)
      const newHistory = [...prev.history.slice(0, prev.historyIndex + 1), newElements]
      return {
        ...prev,
        elements: newElements,
        selectedId: null,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  }, [])

  const selectElement = useCallback((id: string | null) => {
    setDesign(prev => ({ ...prev, selectedId: id }))
  }, [])

  // Undo / Redo
  const undo = useCallback(() => {
    setDesign(prev => {
      if (prev.historyIndex <= 0) return prev
      const newIndex = prev.historyIndex - 1
      return { ...prev, elements: prev.history[newIndex], historyIndex: newIndex, selectedId: null }
    })
  }, [])

  const redo = useCallback(() => {
    setDesign(prev => {
      if (prev.historyIndex >= prev.history.length - 1) return prev
      const newIndex = prev.historyIndex + 1
      return { ...prev, elements: prev.history[newIndex], historyIndex: newIndex, selectedId: null }
    })
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (design.selectedId && !(e.target as HTMLElement).closest('input, textarea')) {
          deleteElement(design.selectedId)
        }
      }
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        if (e.shiftKey) { redo() } else { undo() }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [design.selectedId, deleteElement, undo, redo])

  const selectedElement = design.elements.find(el => el.id === design.selectedId) || null

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0f0f0f]">
      {/* ============ TOP TOOLBAR ============ */}
      <Toolbar
        design={design}
        setDesign={setDesign}
        undo={undo}
        redo={redo}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />

      {/* ============ MAIN AREA ============ */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Tool Panel */}
        <ToolPanel
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          addElement={addElement}
          design={design}
          setDesign={setDesign}
        />

        {/* Center: Canvas */}
        <Canvas
          design={design}
          setDesign={setDesign}
          selectElement={selectElement}
          updateElement={updateElement}
          activeTool={activeTool}
          addElement={addElement}
        />

        {/* Right: Properties */}
        <PropertiesPanel
          element={selectedElement}
          updateElement={updateElement}
          deleteElement={deleteElement}
          addElement={addElement}
          design={design}
          setDesign={setDesign}
        />
      </div>
    </div>
  )
}
