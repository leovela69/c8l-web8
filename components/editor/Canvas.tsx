'use client'

import { useRef, useState, useCallback } from 'react'
import { DesignElement, DesignState } from '@/app/editor/page'

interface CanvasProps {
  design: DesignState
  setDesign: (fn: (prev: DesignState) => DesignState) => void
  selectElement: (id: string | null) => void
  updateElement: (id: string, updates: Partial<DesignElement>) => void
  activeTool: string
  addElement: (element: Omit<DesignElement, 'id'>) => void
}

export default function Canvas({ design, setDesign, selectElement, updateElement, activeTool, addElement }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null)
  const [resizing, setResizing] = useState<{ id: string; handle: string; startX: number; startY: number; startW: number; startH: number; startElX: number; startElY: number } | null>(null)

  const zoom = design.zoom

  // Handle canvas click (deselect)
  const handleCanvasClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.canvas === 'true') {
      selectElement(null)
    }
  }

  // Handle element mousedown (start drag)
  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation()
    selectElement(elementId)
    const el = design.elements.find(el => el.id === elementId)
    if (!el) return

    setDragging({
      id: elementId,
      startX: e.clientX,
      startY: e.clientY,
      elX: el.x,
      elY: el.y,
    })

    const handleMouseMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - e.clientX) / zoom
      const dy = (ev.clientY - e.clientY) / zoom
      updateElement(elementId, { x: el.x + dx, y: el.y + dy })
    }

    const handleMouseUp = () => {
      setDragging(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle resize
  const handleResizeMouseDown = (e: React.MouseEvent, elementId: string, handle: string) => {
    e.stopPropagation()
    const el = design.elements.find(el => el.id === elementId)
    if (!el) return

    const startX = e.clientX
    const startY = e.clientY

    const handleMouseMove = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / zoom
      const dy = (ev.clientY - startY) / zoom

      let newWidth = el.width
      let newHeight = el.height
      let newX = el.x
      let newY = el.y

      if (handle.includes('e')) { newWidth = Math.max(20, el.width + dx) }
      if (handle.includes('w')) { newWidth = Math.max(20, el.width - dx); newX = el.x + dx }
      if (handle.includes('s')) { newHeight = Math.max(20, el.height + dy) }
      if (handle.includes('n')) { newHeight = Math.max(20, el.height - dy); newY = el.y + dy }

      updateElement(elementId, { width: newWidth, height: newHeight, x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setResizing(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Render element
  const renderElement = (element: DesignElement) => {
    const isSelected = design.selectedId === element.id
    const style: React.CSSProperties = {
      position: 'absolute',
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      transform: `rotate(${element.rotation}deg)`,
      opacity: element.opacity,
      cursor: 'move',
    }

    let content: React.ReactNode = null

    switch (element.type) {
      case 'text':
        content = (
          <div
            style={{
              fontSize: element.fontSize,
              fontWeight: element.fontWeight as any,
              fontFamily: element.fontFamily,
              textAlign: element.textAlign as any,
              color: element.color,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start',
              overflow: 'hidden',
              lineHeight: 1.2,
              wordBreak: 'break-word',
            }}
          >
            {element.content}
          </div>
        )
        break

      case 'shape':
        if (element.shapeType === 'circle') {
          content = (
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              backgroundColor: element.fill,
              border: element.strokeWidth ? `${element.strokeWidth}px solid ${element.stroke}` : 'none',
            }} />
          )
        } else if (element.shapeType === 'triangle') {
          content = (
            <div style={{
              width: 0, height: 0,
              borderLeft: `${element.width / 2}px solid transparent`,
              borderRight: `${element.width / 2}px solid transparent`,
              borderBottom: `${element.height}px solid ${element.fill}`,
            }} />
          )
        } else {
          content = (
            <div style={{
              width: '100%', height: '100%',
              backgroundColor: element.fill,
              borderRadius: element.borderRadius || 0,
              border: element.strokeWidth ? `${element.strokeWidth}px solid ${element.stroke}` : 'none',
            }} />
          )
        }
        break

      case 'image':
        content = (
          <img
            src={element.src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: (element.objectFit as any) || 'cover', borderRadius: 4 }}
            draggable={false}
          />
        )
        break
    }

    return (
      <div
        key={element.id}
        style={style}
        onMouseDown={(e) => handleElementMouseDown(e, element.id)}
        className="group"
      >
        {content}

        {/* Selection handles */}
        {isSelected && (
          <>
            <div className="absolute inset-0 border-2 border-violet-500 pointer-events-none rounded-sm" />
            {/* Resize handles */}
            {['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'].map(handle => {
              const pos: React.CSSProperties = {}
              if (handle.includes('n')) pos.top = -4
              if (handle.includes('s')) pos.bottom = -4
              if (handle.includes('e')) pos.right = -4
              if (handle.includes('w')) pos.left = -4
              if (handle === 'n' || handle === 's') { pos.left = '50%'; pos.transform = 'translateX(-50%)' }
              if (handle === 'e' || handle === 'w') { pos.top = '50%'; pos.transform = 'translateY(-50%)' }

              const cursor = handle === 'n' || handle === 's' ? 'ns-resize'
                : handle === 'e' || handle === 'w' ? 'ew-resize'
                : handle === 'nw' || handle === 'se' ? 'nwse-resize' : 'nesw-resize'

              return (
                <div
                  key={handle}
                  className="absolute w-2.5 h-2.5 bg-white border-2 border-violet-500 rounded-sm"
                  style={{ ...pos, cursor }}
                  onMouseDown={(e) => handleResizeMouseDown(e, element.id, handle)}
                />
              )
            })}
          </>
        )}
      </div>
    )
  }

  return (
    <div
      className="flex-1 overflow-auto bg-[#0f0f0f] flex items-center justify-center p-8"
      onClick={handleCanvasClick}
      data-canvas="true"
    >
      {/* Canvas container */}
      <div
        ref={canvasRef}
        className="relative shadow-2xl shadow-black/50"
        style={{
          width: design.width * zoom,
          height: design.height * zoom,
          backgroundColor: design.backgroundColor.startsWith('linear') ? undefined : design.backgroundColor,
          backgroundImage: design.backgroundColor.startsWith('linear') ? design.backgroundColor : undefined,
          transform: `scale(1)`,
          transformOrigin: 'center center',
        }}
        data-canvas="true"
      >
        {/* Inner container with zoom applied to elements */}
        <div
          style={{
            width: design.width,
            height: design.height,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            position: 'relative',
          }}
          data-canvas="true"
        >
          {design.elements.map(renderElement)}
        </div>
      </div>
    </div>
  )
}
